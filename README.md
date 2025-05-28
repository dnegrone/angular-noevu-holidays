# Swiss Canton Holiday Tracker
## Project Description
The Swiss Canton Holiday Tracker is an Angular application designed to help users track public holidays in various Swiss cantons. It allows users to define their workdays and instantly see which holidays fall on their work schedule, providing clear visual cues for past, current, and future holidays.

## Key Features
- **Canton & Year Selection:** Easily select a specific Swiss canton and year to view relevant holidays.
- **Workday Configuration:** Customize your workdays (Monday to Friday, or any combination) to filter holidays according to your personal schedule.
- **Intuitive Holiday Display:** See a clear list of holidays, categorized by whether they fall on your workdays or not.
- **Visual Cues:** Holidays are color-coded for quick identification:
    - Green: Future public holiday on your workday.
    - Yellow: Today's public holiday on your workday.
    - Indigo: Past public holiday on your workday.
    - Gray: Holiday not on your workday (e.g., weekend or selected off day).
- **Setting Persistence:** Your selected canton, year, and workdays are saved automatically in Local Storage for a seamless experience on return.
- **Responsive Design:** The application adapts gracefully to various screen sizes (mobile, tablet, desktop).
- **Enhanced User Experience:** Custom checkboxes with subtle animations and uniformly sized holiday cards provide a polished and intuitive interface.

## Technologies Used
- **Angular (v19.x):** The core framework for building the single-page application.
- **TypeScript:** The primary language for Angular development, offering strong typing for robust code.
- **Tailwind CSS:** A utility-first CSS framework for rapid and consistent styling.
- **RxJS:** Used extensively in the HolidayService for reactive programming and handling asynchronous data streams from the API.
- **Local Storage:** For client-side data persistence of user preferences (canton, year, workdays).
- **OpenHolidays API:** External API providing public holiday data for various countries and regions.

## Project Structure & Architecture
The application follows a modular and component-driven architecture for better organization, scalability, and maintainability:

- **src/app/core/:** Contains core services (e.g., HolidayService, LocalStorageService) and models/enums shared across the application. These are typically singletons.
- **src/app/features/holiday-tracker/:** Houses the main feature module, primarily the HolidayTrackerComponent. This component acts as the orchestrator, managing data fetching, state, and business logic.
- **src/app/shared/components/:** Stores reusable UI components that are stateless and receive data via @Input()s and emit events via @Output()s.
- **WorkDayCheckboxComponent:** A custom checkbox component that encapsulates the display and interaction logic for workdays, including visual animations.
- **HolidayCardComponent:** A dedicated component for displaying individual holiday details, responsible for its own styling and conditional rendering logic (e.g., color-coding based on holiday type).
- **Signals:** Angular Signals are utilized for reactive state management within components, ensuring efficient change detection and clear data flow.
- **Separation of Concerns:** Data fetching and business logic are clearly separated into services, while UI rendering is handled by dedicated, reusable components.

## Notable Design & UX Decisions
Throughout the development, emphasis was placed on creating a user-friendly and visually appealing experience:

- **Componentization:** Breaking down the UI into smaller, focused components (WorkDayCheckboxComponent, HolidayCardComponent) significantly improved code reusability, testability, and clarity of the main template.
- **Tailwind CSS for Responsiveness & Styling:** Leveraging Tailwind's utility classes allowed for rapid UI development, ensuring a consistent look and feel across the application and inherent responsiveness.
- **Custom Checkbox Animation:** Implementing a custom solution for the workday checkboxes allowed for a subtle "pop" animation on the tick mark, providing immediate and satisfying visual feedback to the user on interaction.
- **Color Legend:** A clear color legend was added to intuitively explain the meaning of each holiday card's background color, enhancing user comprehension at a glance.
- **Uniform Card Height:** Utilizing Flexbox properties within the HolidayCardComponent ensures that all holiday cards maintain a consistent height when displayed in the grid, leading to a cleaner and more organized visual layout.

## How to Run the Project
To get this project up and running on your local machine, follow these steps:

#### Clone the Repository:

```bash
git clone https://github.com/dnegrone/angular-noevu-holidays.git
cd angular-noevu-holidays
```

#### Install Dependencies:

```bash
npm install
```

#### Start the Development Server:
```bash
ng serve
```

#### Access the Application:
Open your web browser and navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

This README.md covers everything from the user's perspective to your architectural decisions. Let me know if you'd like any adjustments or additions!

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
