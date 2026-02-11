export type AppointmentRequest = {
  name: string;
  email: string;
  phone: string;
  preferredDate?: string;
  reason?: string;
  message?: string;
};
