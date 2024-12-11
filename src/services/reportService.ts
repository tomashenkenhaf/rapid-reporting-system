import { supabase } from "@/integrations/supabase/client";
import type { UploadedFile } from "@/utils/fileUpload";

interface ReportData {
  title: string;
  description: string;
  category_id: string;
  incident_date: string | null;
  incident_time: string | null;
  location: string | null;
  user_id: string;
}

export const createReport = async (reportData: ReportData) => {
  const { data, error } = await supabase
    .from('reports')
    .insert(reportData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateReport = async (id: string, reportData: ReportData) => {
  const { data, error } = await supabase
    .from('reports')
    .update(reportData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

interface EvidenceData extends UploadedFile {
  report_id: string;
  uploaded_by: string;
}

export const saveEvidence = async (evidenceData: EvidenceData[]) => {
  const { error } = await supabase
    .from('evidence')
    .insert(evidenceData.map(evidence => ({
      file_url: evidence.file_url,
      file_type: evidence.file_type,
      description: evidence.description,
      report_id: evidence.report_id,
      uploaded_by: evidence.uploaded_by
    })));

  if (error) throw error;
};