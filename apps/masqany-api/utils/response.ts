export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: {
      code?: string | number;
      message: string;
      details?: unknown;
    };
}

export function success<T>(data?: T, message?: string) {
    return {
      success: true,
      message,
      data,
    };
}
  
export function failure(message: string, code?: string | number, details?: any) {
    return {
        success: false,
        error: {
            code,
            message,
            details,
        },
    };
}