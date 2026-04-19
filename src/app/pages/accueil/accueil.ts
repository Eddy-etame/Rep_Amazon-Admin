import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

type ServiceHealth = {
  status: string;
  code?: number;
  error?: string;
  lastCheck?: string;
};

type AggregatePayload = {
  success?: boolean;
  data?: {
    gateway?: { status?: string; code?: number };
    services?: Record<string, ServiceHealth>;
  };
};

type AdminHealthPayload = {
  success?: boolean;
  data?: { service?: string; status?: string };
};

@Component({
  selector: 'app-accueil',
  imports: [DatePipe],
  templateUrl: './accueil.html',
  styleUrl: './accueil.scss'
})
export class Accueil implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);

  readonly env = environment;

  aggregate: AggregatePayload | null = null;
  aggregateError: string | null = null;
  adminHealth: AdminHealthPayload | null = null;
  adminError: string | null = null;
  lastCheckAt: Date | null = null;
  checking = false;

  private pollId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.refreshHealth();
    this.pollId = setInterval(
      () => this.refreshHealth(),
      this.env.healthPollIntervalMs
    );
  }

  ngOnDestroy(): void {
    if (this.pollId !== null) {
      clearInterval(this.pollId);
      this.pollId = null;
    }
  }

  open(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  refreshHealth(): void {
    if (this.checking) {
      return;
    }
    this.checking = true;
    const aggUrl = `${this.env.gatewayOrigin}/health/aggregate`;
    const adminUrl = `${this.env.adminServiceOrigin}/health`;

    forkJoin({
      aggregate: this.http.get<AggregatePayload>(aggUrl).pipe(
        catchError((err: { status?: number; message?: string }) => {
          this.aggregate = null;
          this.aggregateError =
            err?.status === 0
              ? 'Impossible de joindre la gateway (CORS ou service arrêté).'
              : `Erreur ${err?.status ?? '?'} — ${err?.message ?? 'requête échouée'}`;
          return of(null);
        })
      ),
      admin: this.http.get<AdminHealthPayload>(adminUrl).pipe(
        catchError((err: { status?: number; message?: string }) => {
          this.adminHealth = null;
          this.adminError =
            err?.status === 0
              ? 'admin-service ne répond pas (démarrer avec npm run start:admin dans Amaz_back).'
              : `Erreur ${err?.status ?? '?'} — ${err?.message ?? 'requête échouée'}`;
          return of(null);
        })
      )
    }).subscribe({
      next: ({ aggregate, admin }) => {
        if (aggregate) {
          this.aggregate = aggregate;
          this.aggregateError = null;
        }
        if (admin) {
          this.adminHealth = admin;
          this.adminError = null;
        }
        this.lastCheckAt = new Date();
        this.checking = false;
      },
      error: () => {
        this.checking = false;
      }
    });
  }

  serviceEntries(): { name: string; h: ServiceHealth }[] {
    const svc = this.aggregate?.data?.services;
    if (!svc) {
      return [];
    }
    return Object.keys(svc).map((name) => ({ name, h: svc[name] }));
  }

  adminJsReachable(): boolean {
    return (
      !this.adminError &&
      (this.adminHealth?.data?.status === 'ok' ||
        this.adminHealth?.success === true)
    );
  }

  platformOverallOk(): boolean {
    const g = this.aggregate?.data?.gateway?.status;
    if (g !== 'ok') {
      return false;
    }
    const entries = this.serviceEntries();
    if (entries.length === 0) {
      return !this.aggregateError;
    }
    return entries.every((e) => e.h.status === 'ok');
  }
}
