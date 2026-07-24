import type { LucideIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { Button, Card, Typography } from "@heroui/react";

type StatusPageCardProps = {
  actionHref: string;
  actionIcon: LucideIcon;
  actionLabel: string;
  badgeIcon: LucideIcon;
  badgeLabel: string;
  detail: string;
  description: string;
  detailTitle: string;
  title: string;
};

export function StatusPageCard( {
  actionHref,
  actionIcon: ActionIcon,
  actionLabel,
  badgeIcon: BadgeIcon,
  badgeLabel,
  detail,
  description,
  detailTitle,
  title,
}: StatusPageCardProps ) {
  return (
    <main
      className={
        "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-6 text-foreground " +
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--accent)_10%,transparent),transparent_38%),linear-gradient(135deg,color-mix(in_oklch,var(--accent)_8%,transparent),transparent_34%,var(--background)_70%)] " +
        "before:opacity-70 sm:px-6"
      }
    >
      <div
        aria-hidden={ "true" }
        className={ "pointer-events-none absolute -left-28 -top-24 size-72 rounded-full bg-accent/15 blur-3xl sm:size-96" }
      />
      <div
        aria-hidden={ "true" }
        className={ "pointer-events-none absolute -bottom-32 -right-24 size-80 rounded-full bg-accent/10 blur-3xl sm:size-112" }
      />
      <div
        aria-hidden={ "true" }
        className={
          "pointer-events-none absolute left-6 top-8 h-28 w-28 opacity-[0.16] " +
          "bg-[radial-gradient(var(--accent)_1px,transparent_1px)] bg-size-[14px_14px] sm:left-14 sm:top-16 sm:h-40 sm:w-40"
        }
      />
      <div
        aria-hidden={ "true" }
        className={
          "pointer-events-none absolute bottom-8 right-6 h-32 w-32 opacity-[0.12] " +
          "bg-[linear-gradient(to_right,var(--accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--accent)_1px,transparent_1px)] [background-size:18px_18px] sm:bottom-14 sm:right-16 sm:h-44 sm:w-44"
        }
      />

      <Card className={ "relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface shadow-sm" } variant={ "default" }>
        <Card.Content className={ "space-y-6 px-5 py-6 text-center sm:px-8 sm:py-8" }>
          <div className={ "space-y-3" }>
            <div className={ "mx-auto flex size-16 items-center justify-center rounded-2xl border border-border bg-surface-secondary p-2 shadow-sm" }>
              <Image
                alt={ "Gym App icon" }
                className={ "size-12" }
                height={ 48 }
                priority
                src={ "/app-icon.svg" }
                width={ 48 }
              />
            </div>

            <div className={ "mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground" }>
              <BadgeIcon className={ "size-3.5" } />
              { badgeLabel }
            </div>
          </div>

          <div className={ "space-y-2" }>
            <Typography className={ "font-semibold tracking-normal" } type={ "h4" }>
              { title }
            </Typography>
            <Typography color={ "muted" } type={ "body-sm" }>
              { description }
            </Typography>
          </div>

          <div className={ "rounded-2xl border border-border bg-surface-secondary/80 p-4 text-left" }>
            <Typography className={ "font-medium" } type={ "body-sm" }>
              { detailTitle }
            </Typography>
            <Typography className={ "mt-2" } color={ "muted" } type={ "body-sm" }>
              { detail }
            </Typography>
          </div>

          <Link className={ "block" } href={ actionHref }>
            <Button className={ "w-full bg-accent text-accent-foreground" } size={ "lg" }>
              <ActionIcon className={ "size-4" } />
              { actionLabel }
            </Button>
          </Link>
        </Card.Content>
      </Card>
    </main>
  );
}
