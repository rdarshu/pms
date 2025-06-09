
# PMS — Patient Management System

A simple Angular-based PMS app to manage patient records, authentication, and CRUD operations, using mock APIs (ngx in-memory web API) for backend.

---

## 🚀 Features

- Patient login/logout (ngx-cookie-service)
- Delete for patients
- Filtering & search functionality with Angular Signals
- In-memory API (via `angular-in-memory-web-api`)
- Reactive state management using `@ngrx/signals`

---

## 🛠️ Tech Stack

- **Frontend**  
  - Angular 19+ (standalone components)
  - Angular Material (toolbar, snackbar, inputs, buttons)
  - ngx-cookie-service (for auth token)
  - angular-in-memory-web-api (mock backend)
  - @ngrx/signals (SignalStore PATIENT state)
  - RxJS (`toSignal`, `tap`, etc.)

---

## ⚙️ Getting Started

1. Clone this repo:  
   ```bash
   git clone https://github.com/rdarshu/pms.git
   cd pms
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Run the application:  
   ```bash
   ng serve
   ```

4. Open in browser at `http://localhost:4200`

---

## 🔍 Searching Patients

Use the search bar to filter by name — results update reactively as you type (powered by Angular Signals and `computed()` filtering).

---

## 📂 Project Structure

```
src/
├─ app/
│  ├─ service/
│  │   └─ api.service.ts         # HTTP wrapper
│  ├─ store/
│  │   └─ patients.store.ts      # SignalStore for patients
│  ├─ login/
│  │   └─ login.component.ts     # Auth handling
│  ├─ dashboard/
│  ├─ in-memory-data.service.ts  # Mock API backend
│  ├─ auth.interceptor.ts       # Adds x-api-key header
│  ├─ spinner.store.ts          # Global spinner state
│  ├─ toast.store.ts            # Snackbar triggering
│  └─ patient-list.component.ts # Patient listing + filtering
└─ main.ts                      # Bootstraps standalone app with in-memory API
```

---

## 🔧 Usage

- **Login**: Use the mock credentials in `in-memory-data.service.ts`
- **Managing patients**:  delete records in patient list
- **Filtering**: Reactive search updates as you type
- **Auth guard**: Protects routes using cookies and `SignalStore` auth state
- **Spinner**: Shows loading during API calls
- **Toasts**: Notifications for CRUD actions

---

## 📢 Future Enhancements

- Real backend integration
- Form validation and toast messages for invalid inputs
- Profile management and role-based access
- Pagination or infinite scroll
- Sorting, filtering by multiple fields

---

## 🧪 Testing

(Currently no tests are included. For production, add unit & e2e tests)

---

## 📄 License

Specify your license here (e.g., MIT)

---

## ✉️ Feedback & Contributions

Feel free to open issues or submit pull requests!
