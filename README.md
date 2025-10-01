# Location History Visualizer

This is a full-stack web application designed to parse, analyze, and visualize Google Location History data. Users can upload their `LocationHistory.json` file to see an interactive heatmap of their movements and get statistical insights into their travel patterns. The application also features a complete admin dashboard for aggregate data analysis.

![heatmap, statistics](/other/overview.png?raw=true "Overview")

## Features

### User-Facing Features:
* [cite_start]**Secure User Authentication:** Standard user registration and login system with session management[cite: 777, 789, 790, 804].
* [cite_start]**File Upload:** Simple interface for users to upload their Google Takeout `LocationHistory.json` file[cite: 670].
* [cite_start]**Interactive Heatmap:** Displays all location data points on an interactive map using **Leaflet.js**, showing geographic concentrations of activity[cite: 377, 611].
* [cite_start]**Data Filtering:** Users can filter the displayed data by date range (year, month, day) and time of day[cite: 399, 405, 414, 421].
* **Activity Analysis:** The application calculates and displays statistics on different types of activities (e.g., walking, in vehicle, running).

### Admin Dashboard:
* [cite_start]**Aggregate Data Visualization:** The admin dashboard provides charts and graphs (using **Chart.js**) that show trends across all user data[cite: 487, 497, 529].
* [cite_start]**Statistical Breakdowns:** View data distributions by year, month, day of the week, and hour of the day[cite: 862, 867, 871, 880].
* [cite_start]**User Data Metrics:** See statistics on the number of records per user[cite: 884].
* [cite_start]**Data Export:** Admins can export filtered aggregate data to CSV, JSON, or XML formats[cite: 913, 917, 918].

## Tech Stack

* **Backend:** PHP
* **Database:** MySQL
* **Frontend:** HTML, CSS, JavaScript, jQuery, AJAX
* **Mapping Library:** [Leaflet.js](https://leafletjs.com/)
* **Charting Library:** [Chart.js](https://www.chartjs.org/)

## How It Works

1.  **Data Upload & Parsing:** The user uploads their JSON file, which is processed by a PHP script on the backend. [cite_start]The script parses the nested JSON structure, extracts key data points (latitude, longitude, timestamp, activity type), and stores them in the MySQL database[cite: 933, 937, 938, 939].
2.  **API Endpoints:** The PHP backend serves as an API, with endpoints that respond to AJAX requests from the frontend. [cite_start]These endpoints query the database based on user-selected filters[cite: 591, 891, 892].
3.  [cite_start]**Frontend Visualization:** The frontend JavaScript receives the data from the API and dynamically updates the Leaflet.js heatmap and the Chart.js graphs, providing a seamless and interactive user experience[cite: 374, 493, 510].

## More
For more explanation and screenshots see: [Presentation](/presentation.pdf) (greek)
Database creation at: /database export. Fake/test data can be generated with generate_random_location_dates.py

<b>note:</b> data outside of [patras, Greece] is cut off as per requested guidelines
