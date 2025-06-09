import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class DummyDataService implements InMemoryDbService {

  createDb(): { users: any[]; patients: any[] } {
    const users = [
      {
        id: 1,
        email: 'Claudine92@hotmail.com',
        password: 'uECaMprEVBjzt54',
        token: '552a69f06b5f4501a314cd78259e1362'
      }
    ];

    const patients = [
      { id: 1, name: "John Doe", description: "Diabetic patient" },
      { id: 2, name: "Jane Smith", description: "Hypertension case" },
      { id: 3, name: "Robert Brown", description: "Allergy history" },
      { id: 4, name: "Emily White", description: "Recovering from surgery" },
      { id: 5, name: "Michael Johnson", description: "Pediatric visit" },
      { id: 6, name: "Patricia Garcia", description: "Routine checkup" },
      { id: 7, name: "James Lee", description: "Orthopedic consultation" },
      { id: 8, name: "Linda Walker", description: "Asthma treatment" },
      { id: 9, name: "William Hall", description: "Neurology follow-up" },
      { id: 10, name: "Barbara Allen", description: "Prenatal care" },
      { id: 11, name: "David Young", description: "Eye checkup" },
      { id: 12, name: "Susan Hernandez", description: "ENT complaint" },
      { id: 13, name: "Richard King", description: "Dermatology case" },
      { id: 14, name: "Karen Wright", description: "Postnatal follow-up" },
      { id: 15, name: "Charles Scott", description: "MRI scheduled" },
      { id: 16, name: "Lisa Green", description: "Blood pressure monitoring" },
      { id: 17, name: "Thomas Adams", description: "Annual physical" },
      { id: 18, name: "Nancy Baker", description: "Cholesterol check" },
      { id: 19, name: "Christopher Nelson", description: "Cardiology referral" },
      { id: 20, name: "Karen Mitchell", description: "Vaccination booster" }
    ];

    return { users, patients };
  }


  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'login') {
      const body: LoginRequest = (reqInfo.req as any).body || reqInfo.utils.getJsonBody(reqInfo.req);

      const db = reqInfo.utils.getDb() as {
        users: { email: string; password: string; token: string }[];
      };

      const user = db.users.find(
        u => u.email === body.email && u.password === body.password
      );

      if (user) {
        return reqInfo.utils.createResponse$(() => ({
          status: 200,
          body: { token: user.token, user: { email: user.email } }
        }));
      } else {
        return reqInfo.utils.createResponse$(() => ({
          status: 401,
          body: { error: 'Unauthorized' }
        }));
      }
    }

    return undefined;
  }

  get(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'patients') {
      const headers = (reqInfo.req as any)['headers'];
      const apiKey = headers?.get('x-api-key');
      console.log(apiKey);
      if (apiKey !== '552a69f06b5f4501a314cd78259e1362') {
        return reqInfo.utils.createResponse$(() => ({
          status: 403,
          body: { error: 'Forbidden: Missing or invalid API key' }
        }));
      }
    }

    return undefined;
  }
}
