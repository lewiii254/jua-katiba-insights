
-- Add idempotency key for quiz attempts (client-generated UUID)
ALTER TABLE public.quiz_attempts
  ADD COLUMN IF NOT EXISTS attempt_id uuid NOT NULL DEFAULT gen_random_uuid();

-- Unique per user so retries with same attempt_id are deduped
CREATE UNIQUE INDEX IF NOT EXISTS quiz_attempts_user_attempt_unique
  ON public.quiz_attempts (user_id, attempt_id);

-- Helpful index for dashboard listing
CREATE INDEX IF NOT EXISTS quiz_attempts_user_created_idx
  ON public.quiz_attempts (user_id, created_at DESC);
