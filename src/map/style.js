
class MBStyle {
    url: null
    darkMode: null

    constructor(url, darkMode) {
        this.url = url;
        this.darkMode = darkMode;

        this.assertStyle();
    }

    assertStyle() {
        if (!this.url.startsWith('mapbox://styles')) {
            if (this.url.split('.').length === 2) {
                throw new MBStyleError('Classic Mapbox Style URLS are not supported');
            } else {
                throw new MBStyleError('Incorrect URL provide, does the mapbox url exist?');
            }
        }
        return this.url;
    }
}

function MBStyleError(message) {
  this.name = 'IncorrectStyleError';
  this.message = message || 'Mapbox style incorrect';
  this.stack = (new Error()).stack;
}
MBStyleError.prototype = Object.create(Error.prototype);
MBStyleError.prototype.constructor = MBStyleError;

export default MBStyle;