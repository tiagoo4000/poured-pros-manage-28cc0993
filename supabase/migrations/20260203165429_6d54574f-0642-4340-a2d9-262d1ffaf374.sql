-- Create site_settings table for managing configurable site content
CREATE TABLE public.site_settings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    whatsapp_numbers JSONB DEFAULT '[]'::jsonb,
    logo_url TEXT,
    company_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view site settings)
CREATE POLICY "Site settings are publicly readable" 
ON public.site_settings 
FOR SELECT 
USING (true);

-- Only authenticated admins can modify settings (we'll add admin role check later)
CREATE POLICY "Authenticated users can update settings" 
ON public.site_settings 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert settings" 
ON public.site_settings 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.site_settings (whatsapp_numbers, company_address)
VALUES (
    '[{"number": "5511999999999", "label": "Principal", "active": true}]'::jsonb,
    'Rua da Construção, 123 - Centro, Cidade - SP'
);

-- Create storage bucket for logo uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to logos
CREATE POLICY "Logos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'logos');

-- Allow authenticated users to upload logos
CREATE POLICY "Authenticated users can upload logos" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'logos');

-- Allow authenticated users to update logos
CREATE POLICY "Authenticated users can update logos" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (bucket_id = 'logos');

-- Allow authenticated users to delete logos
CREATE POLICY "Authenticated users can delete logos" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'logos');