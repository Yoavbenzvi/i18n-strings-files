// Generated by CoffeeScript 1.10.0
(function() {
  var checkValues, checkValuesWithComments, fileEncoding, fileTemp, fileTest, fs, i18nStringsFiles, should;

  fs = require('fs');

  should = require('should');

  i18nStringsFiles = require('../index');

  fileTemp = __dirname + '/temp.strings';

  fileTest = __dirname + '/test.strings';

  fileEncoding = 'UTF-16';

  checkValues = function(data) {
    data['test-normal'].should.equal("Test normal");
    data['test-chars'].should.equal("Olvidé mi contraseña");
    data['test-new-lines'].should.equal("Test\nNew\nLines");
    data['test-quotes'].should.equal("\"Test quote\"");
    data['test-semicolon'].should.equal("Test \"; semicolon");
    data['test-spacing'].should.equal("Test spacing");
    data['test \n edge" = '].should.equal("Test edge");
    return data['test-multiline-comment'].should.equal("Test multiline comment");
  };

  checkValuesWithComments = function(data) {
    data['test-normal']['text'].should.equal("Test normal");
    data['test-normal']['comment'].should.equal("Normal");
    data['test-chars']['text'].should.equal("Olvidé mi contraseña");
    data['test-chars']['comment'].should.equal("Special characters");
    data['test-new-lines']['text'].should.equal("Test\nNew\nLines");
    data['test-new-lines']['comment'].should.equal("Escaped new lines");
    data['test-quotes']['text'].should.equal("\"Test quote\"");
    data['test-quotes']['comment'].should.equal("Escaped quotes");
    data['test-semicolon']['text'].should.equal("Test \"; semicolon");
    data['test-semicolon']['comment'].should.equal("Quote and semicolon case");
    data['test-spacing']['text'].should.equal("Test spacing");
    data['test-spacing']['comment'].should.equal("Messed up spacing");
    data['test \n edge" = ']['text'].should.equal("Test edge");
    data['test \n edge" = ']['comment'].should.equal("Edge case");
    data['test-multiline-comment']['text'].should.equal("Test multiline comment");
    return data['test-multiline-comment']['comment'].should.equal("Multiline\nComment");
  };

  describe('Sync: Reading file into object', function() {
    it('should populate object properties with values', function() {
      var data;
      data = i18nStringsFiles.readFileSync(fileTest, fileEncoding);
      return checkValues(data);
    });
    return it('should populate object properties with values (wantsComments = true)', function() {
      var data;
      data = i18nStringsFiles.readFileSync(fileTest, {
        'encoding': fileEncoding,
        'wantsComments': true
      });
      return checkValuesWithComments(data);
    });
  });

  describe('Sync: Read, compile, parse', function() {
    it('should populate object properties with values before and after', function() {
      var data, str;
      data = i18nStringsFiles.readFileSync(fileTest, fileEncoding);
      checkValues(data);
      str = i18nStringsFiles.compile(data);
      data = i18nStringsFiles.parse(str);
      return checkValues(data);
    });
    return it('should populate object properties with values before and after (wantsComments = true)', function() {
      var data, str;
      data = i18nStringsFiles.readFileSync(fileTest, {
        'encoding': fileEncoding,
        'wantsComments': true
      });
      checkValuesWithComments(data);
      str = i18nStringsFiles.compile(data, true);
      data = i18nStringsFiles.parse(str, true);
      return checkValuesWithComments(data);
    });
  });

  describe('Sync: Read, write, read', function() {
    it('should populate object properties with values before and after', function() {
      var data;
      data = i18nStringsFiles.readFileSync(fileTest, fileEncoding);
      checkValues(data);
      i18nStringsFiles.writeFileSync(fileTemp, data, fileEncoding);
      data = i18nStringsFiles.readFileSync(fileTemp, fileEncoding);
      checkValues(data);
      return fs.unlinkSync(fileTemp);
    });
    return it('should populate object properties with values before and after (wantsComments = true)', function() {
      var data;
      data = i18nStringsFiles.readFileSync(fileTest, {
        'encoding': fileEncoding,
        'wantsComments': true
      });
      checkValuesWithComments(data);
      i18nStringsFiles.writeFileSync(fileTemp, data, {
        'encoding': fileEncoding,
        'wantsComments': true
      });
      data = i18nStringsFiles.readFileSync(fileTemp, {
        'encoding': fileEncoding,
        'wantsComments': true
      });
      checkValuesWithComments(data);
      return fs.unlinkSync(fileTemp);
    });
  });

  describe('Async: Reading file into object', function() {
    it('should populate object properties with values', function(done) {
      return i18nStringsFiles.readFile(fileTest, fileEncoding, function(err, data) {
        checkValues(data);
        return done();
      });
    });
    return it('should populate object properties with values (wantsComments = true)', function(done) {
      return i18nStringsFiles.readFile(fileTest, {
        'encoding': fileEncoding,
        'wantsComments': true
      }, function(err, data) {
        checkValuesWithComments(data);
        return done();
      });
    });
  });

  describe('Async: Read, write, read', function() {
    it('should populate object properties with values before and after', function(done) {
      return i18nStringsFiles.readFile(fileTest, fileEncoding, function(err, data) {
        checkValues(data);
        return i18nStringsFiles.writeFile(fileTemp, data, fileEncoding, function(err) {
          return i18nStringsFiles.readFile(fileTemp, fileEncoding, function(err, data) {
            checkValues(data);
            fs.unlinkSync(fileTemp);
            return done();
          });
        });
      });
    });
    return it('should populate object properties with values before and after (wantsComments = true)', function(done) {
      return i18nStringsFiles.readFile(fileTest, {
        'encoding': fileEncoding,
        'wantsComments': true
      }, function(err, data) {
        checkValuesWithComments(data);
        return i18nStringsFiles.writeFile(fileTemp, data, {
          'encoding': fileEncoding,
          'wantsComments': true
        }, function(err) {
          return i18nStringsFiles.readFile(fileTemp, {
            'encoding': fileEncoding,
            'wantsComments': true
          }, function(err, data) {
            checkValuesWithComments(data);
            fs.unlinkSync(fileTemp);
            return done();
          });
        });
      });
    });
  });

  describe('Async: Read, write, read (no encoding param)', function() {
    return it('should populate object properties with values before and after', function(done) {
      return i18nStringsFiles.readFile(fileTest, function(err, data) {
        checkValues(data);
        return i18nStringsFiles.writeFile(fileTemp, data, function(err) {
          return i18nStringsFiles.readFile(fileTemp, function(err, data) {
            checkValues(data);
            fs.unlinkSync(fileTemp);
            return done();
          });
        });
      });
    });
  });

  describe('Compilation', function() {
    return it('shall replace windows-style CRLF newlines with LF(mac/unix) newlines', function(done) {
      var crlfDict, lfDict, stringsFileContent;
      crlfDict = {
        aKey: 'Test\r\nNew\r\nLines'
      };
      stringsFileContent = i18nStringsFiles.compile(crlfDict);
      lfDict = {
        aKey: 'Test\nNew\nLines'
      };
      stringsFileContent.should.equal(i18nStringsFiles.compile(lfDict));
      return done();
    });
  });

}).call(this);
