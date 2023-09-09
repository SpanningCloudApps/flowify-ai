export interface DataProcessBodyDto {
  createdBy: string;
  title: string;
  description: string;
  additionalInfo?: string[];
}

export interface DataPrepareBodyDto {
  actor: string;
  workflowName: string;
}

export interface DataStorageDto {
  workflowName: string;
}
