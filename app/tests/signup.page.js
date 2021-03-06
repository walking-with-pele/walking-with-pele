import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignupPage {
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, firstName, lastName, major, bio, image, email, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-fName', firstName);
    await testController.typeText('#signup-form-lName', lastName);
    await testController.typeText('#signup-form-major', major);
    await testController.typeText('#signup-form-bio', bio);
    await testController.typeText('#signup-form-image', image);
    await testController.typeText('#signup-form-email', email);
    await testController.typeText('#signup-form-password', password);
    await testController.click('#signup-form-submit');
    await navBar.isLoggedIn(testController, email);
  }
}

export const signupPage = new SignupPage();
