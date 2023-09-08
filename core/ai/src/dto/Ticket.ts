/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

export interface TicketDto {
  createdBy: string;
  title: string;
  description: string;
  additionalInfo?: string[];
}
