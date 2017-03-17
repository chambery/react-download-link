'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DownloadLink = _react2.default.createClass({
  displayName: 'DownloadLink',


  propTypes: {
    filename: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func]),
    title: _react2.default.PropTypes.string,
    style: _react2.default.PropTypes.object,
    exportFile: _react2.default.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      filename: 'file.txt',
      style: { margin: '5px 5px 0px 0px', textDecoration: 'underline', color: 'blue', cursor: 'pointer' },
      exportFile: function exportFile() {}
    };
  },


  handleDownloadClick: function handleDownloadClick(event) {

    function magicDownload(text, fileName) {
      var blob = new Blob([text], {
        type: 'text/csv;charset=utf8;'
      });

      // create hidden link
      var element = document.createElement('a');
      document.body.appendChild(element);
      element.setAttribute('href', window.URL.createObjectURL(blob));
      element.setAttribute('download', fileName);
      element.style.display = '';

      element.click();

      document.body.removeChild(element);
      event.stopPropagation();
    }

    function isFunction(functionToCheck) {
      return functionToCheck;
    }

    var fileType = event.target.innerText,
        text = this.props.exportFile(fileType);

    var filename = this.props.filename;
    if (this.props.filename && {}.toString.call(this.props.filename) === '[object Function]') {
      filename = this.props.filename();
    }

    if (text instanceof Promise) {
      text.then(function (result) {
        return magicDownload(result, filename);
      });
    } else {
      magicDownload(text, filename);
    }
  },

  render: function render() {
    return _react2.default.createElement(
      'a',
      { style: this.props.style,
        href: 'javascript:void(0)',
        title: this.props.title,
        onClick: this.handleDownloadClick },
      this.props.children
    );
  }
});

exports.default = DownloadLink;
