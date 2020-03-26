interface UpdateAuthToken {
  type: 'update_auth_token';
  payload: {
    authToken: string | null;
  };
}

export function updateAuthToken(authToken: string | null): UpdateAuthToken {
  return {
    type: 'update_auth_token',
    payload: {
      authToken
    }
  };
}

export type Action = UpdateAuthToken;
