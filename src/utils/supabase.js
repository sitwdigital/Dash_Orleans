import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zygdzyonrdsmmhlgsvsl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Z2R6eW9ucmRzbW1obGdzdnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTA1MzMsImV4cCI6MjA2OTM4NjUzM30.2RKtNAGkcreMGso7wtycQJjdLQ-GjUWDlFhhqb7bQ1c'; // anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
