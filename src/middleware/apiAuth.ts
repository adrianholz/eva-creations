import { auth0GetUserByAccessToken } from "@/lib/auth0";
import { getAccessToken } from "@auth0/nextjs-auth0";


export async function verifyAuth() {
  try {
    const { accessToken } = await getAccessToken();
    if (!accessToken) {
      return { isAuthenticated: false, error: 'Access token not found' };
    }

    const userInfo = await auth0GetUserByAccessToken(accessToken);
    return { isAuthenticated: true, userInfo };
  } catch (error: any) {
    return { isAuthenticated: false, error: error?.message };
  }
}