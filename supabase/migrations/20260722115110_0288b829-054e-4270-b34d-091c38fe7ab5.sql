
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname='app_role' AND e.enumlabel='safeguarding_officer') THEN
    ALTER TYPE public.app_role ADD VALUE 'safeguarding_officer';
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname='app_role' AND e.enumlabel='finance_officer') THEN
    ALTER TYPE public.app_role ADD VALUE 'finance_officer';
  END IF;
END $$;
