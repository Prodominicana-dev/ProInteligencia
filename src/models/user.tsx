export default interface User {
  created_at: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  identities: Identity[];
  identity_api: string;
  job_title: string;
  last_ip: string;
  last_login: string;
  logins_count: number;
  name: string;
  nickname: string;
  oid: string;
  phone: string[];
  picture: string;
  tenantid: string;
  updated_at: string;
  upn: string;
  user_id: string;
}

interface Identity {
  access_token: string;
  connection: string;
  expires_in: number;
  isSocial: boolean;
  provider: string;
  user_id: string;
}
