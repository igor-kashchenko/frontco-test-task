# Image Carousel README

[DEMO](https://igor-kashchenko.github.io/frontco-test-task/)

This project is a test task for implementing a simple and user-friendly Image Carousel component in JavaScript or TypeScript using Vue 3. In addition to the basic requirements, we have used PrimeVue, and PrimeFlex to enhance the functionality and design of the Image Carousel. The Image Carousel allows you to scroll through a list of images fetched from picsum.photos, with responsive behavior for both desktop and mobile views. You can also select and deselect images, and the selected images are displayed in a separate list below the carousel.

## Features

### Basic Features
1. **Image Carousel:** The main feature of this project is the image carousel that allows you to scroll through a list of images.

2. **Infinite Scrolling:** You can navigate through the images with "prev" and "next" buttons. The carousel supports infinite scrolling, so you can keep scrolling to see more images.

3. **Responsive Design:**
    - **Desktop Version:** In the desktop view, the number of visible images varies to fit the viewport width. This provides an optimal viewing experience for larger screens.
    - **Mobile Version:** In the mobile view, only one full-width image is shown, making it more suitable for smaller screens.

4. **Select Images:** You can select an image by clicking on it in the carousel. Selected images are marked with a blue border.

5. **Deselect Images:** To deselect an image, click on it again. The blue border will be removed, indicating that the image is no longer selected.

### Additional Features
1. **Selected Image List:** Below the carousel, there is a list of selected images. Each selected image is displayed with its URL and a unique ID. You can see the images you have selected in this list.

2. **Delete Selection:** You can also remove a selected image from the list by clicking on the "Delete" button next to it.

## Technologies Used

This project is built using the following technologies:

- **JavaScript/TypeScript:** The core language for implementing the functionality.
- **Vue 3:** A progressive JavaScript framework for building user interfaces.
- **PrimeVue:** A set of UI components for Vue.js that help improve the user interface.
- **PrimeFlex:** A flexible grid system for layout design, which helps create responsive designs.
- **picsum.photos:** An image placeholder service used to fetch images for the carousel.
