import { Selector } from 'testcafe';

class SpotPage {
  constructor() {
    this.pageId = '#spot-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addcomment(testController, comment) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#add-comment-popup');
      await testController.typeText('#comment-form-text', comment);
      await testController.click('#comment-form-submit');
      await testController.click(Selector('.swal-button--confirm'));
    }
  }

}

export const spotPage = new SpotPage();