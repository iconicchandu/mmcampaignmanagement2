export interface DataRecord {
  subid: string;
  revenue: number;
  campaign: string;
  creative: string;
  et: string;
  advertiser: string;
  fileName: string;
}

export interface ProcessedData {
  records: DataRecord[];
  campaigns: Set<string>;
  ets: Set<string>;
  creatives: Set<string>;
  advertisers: Set<string>;
}

export interface CreativeStats {
  name: string;
  frequency: number;
  revenue: number;
  ets: string[];
}

export interface AdvertiserStats {
  name: string;
  revenue: number;
  campaigns: string[];
}

export interface CampaignStats {
  name: string;
  revenue: number;
  creatives: CreativeStats[];
  ets: string[];
}

export interface ETStats {
  name: string;
  revenue: number;
  creatives: CreativeStats[];
  campaigns: string[];
}