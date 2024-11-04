import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface CableCalculationRequest {
  source_rack: string;
  target_rack: string;
  route_type: 'default' | 'alternate';
  settings: {
    vertical_run: number;
    dressing_allowance: number;
    slack_allowance: number;
    aisle_entry_exit: number;
    middle_cross_tray_height?: number;
    end_cross_tray_height?: number;
  };
}

export interface CableCalculationResponse {
  id: string;
  source_rack: string;
  target_rack: string;
  route_type: string;
  cable_length: number;
  route_path: string;
  timestamp: string;
  settings: CableCalculationRequest['settings'];
}

class CableCalculatorAPI {
  async calculateSingle(request: CableCalculationRequest): Promise<CableCalculationResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/calculate`, request);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async calculateBatch(requests: CableCalculationRequest[]): Promise<CableCalculationResponse[]> {
    try {
      const response = await axios.post(`${API_BASE_URL}/calculate-batch`, requests);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async exportCalculations(options: {
    format: 'csv' | 'json';
    filtered: boolean;
    filters?: Record<string, any>;
  }): Promise<Blob> {
    try {
      const response = await axios.get(`${API_BASE_URL}/export`, {
        params: options,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      return new Error(error.response?.data?.detail || 'API request failed');
    }
    return error;
  }
}

export const cableCalculatorAPI = new CableCalculatorAPI(); 