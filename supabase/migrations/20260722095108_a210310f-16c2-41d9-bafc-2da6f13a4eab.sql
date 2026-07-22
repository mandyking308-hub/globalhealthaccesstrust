
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'volunteer'::public.app_role
FROM auth.users u
WHERE u.email = 'mandyking308+volunteer@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.volunteers (user_id, name, email, phone, country, skills, experience, status)
SELECT u.id, 'Test Volunteer', u.email, '', 'UK', 'Field logistics', 'Test account', 'approved'
FROM auth.users u
WHERE u.email = 'mandyking308+volunteer@gmail.com'
  AND NOT EXISTS (SELECT 1 FROM public.volunteers v WHERE v.user_id = u.id);
