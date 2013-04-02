/**
 * jquery.readmore
 * 
 * Substring long paragraphs and make expandable with "Read More" link.
 * Paragraph will be split either at exactly 'substr_len' chars or at the next
 * space char after 'substr_len' words (default).
 * 
 * @date 02 Apr 2013
 * @author Jake Trent (original author) http://www.builtbyjake.com
 * @author Mike Wendt http://www.mikewendt.net
 * @author Karen Ellrick http://l4jp.com
 * @version 1.7
 */
(function ($) {
  $.fn.readmore = function (settings) {

    var defaults = {
      substr_len: 500,
      animate_time: 1000,
      split_word: false,
      read_less: false,
      ellipses: '&#8230;',
      more_text: 'Read&nbsp;More',
      less_text: 'Read&nbsp;Less',
      more_clzz: 'readm-more',
      ellipse_clzz: 'readm-continue',
      hidden_clzz: 'readm-hidden'
    };

    var opts =  $.extend({}, defaults, settings);
    if (settings.more_link) {  //for backward compatibility with the old option syntax
      opts.more_text = settings.more_link.match(/<a[^>]*>(.*?)<\/a>/)[1];
    }

    this.each(function () {
      var $this = $(this);
      if (($this.html().length > opts.substr_len) && !$this.find('.' + opts.more_clzz).length) {  //edited by Karen (3)
        abridge($this);
        linkage($this);
      }
    });

    function linkage(elem) {
      elem.append('<a class="'+opts.more_clzz+'">'+opts.more_text+'</a>');
      elem.find('.' + opts.more_clzz).click( function () {
        if (opts.read_less) {
          $(this).html(($(this).html()== opts.less_text ? opts.more_text : opts.less_text));
        } else {
          $(this).hide();
        }
        elem.find('.' + opts.ellipse_clzz).toggle();
        if (elem.find('.' + opts.hidden_clzz).is(':visible')) {
          elem.find('.' + opts.hidden_clzz).hide();
        } else {
          elem.find('.' + opts.hidden_clzz).animate({'opacity' : 'toggle'},opts.animate_time);
        }
      });
    }

    function abridge(elem) {
      var txt = elem.html();
      var dots = "<span class='" + opts.ellipse_clzz + "'>" + opts.ellipses + "</span>";
      var shown = txt.substring(0, (opts.split_word ? opts.substr_len : txt.indexOf(' ', opts.substr_len))) + dots;
      var hidden =
        '<span class="' + opts.hidden_clzz + '" style="display:none;">' +
          txt.substring((opts.split_word ? opts.substr_len : txt.indexOf(' ', opts.substr_len)), txt.length) +
        '</span>';
      elem.html(shown + hidden);
    }
    
    return this;
  };
})(jQuery);