$(function() {

    function isScrolledIntoView(el) {
        var r, html;
        if ( !el || 1 !== el.nodeType ) { return false; }
        html = document.documentElement;
        r = el.getBoundingClientRect();

        return ( !!r 
          && r.bottom >= 0 
          && r.right >= 0 
          && r.top <= html.clientHeight 
          && r.left <= html.clientWidth 
        );
    }

    function checkAllInView() {
        $("#image-sliders .slider").each(function() {
            var $this = $(this);
            if (!$this.hasClass("loading") && !$this.hasClass("hidden") && isScrolledIntoView(this)) {
                $this.addClass("loading");
                loadSliderImgs($this);
            }
        });
    }

    function loadSliderImgs($this) {
        var imgs = [
            $this.data("left"),
            $this.data("hover"),
            $this.data("right"),
        ];
        var defs = [
            $.Deferred(),
            $.Deferred(),
            $.Deferred(),
        ]
        $.each(imgs, function(imgIdx) {
            var img = new Image();
            img.onload = function() {
                defs[imgIdx].resolve();
            };
            img.onerror = function() {
                console.error(this.src);
            };
            img.src = imgs[imgIdx];
        });
        $.when.apply($, defs).then(function() {
            var container = $('<div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 loaded-img-slider"></div>');
            var twenty = $('<div class="twentytwenty-container"></div>');
            twenty.html('<img src="' + $this.data("left") + '"><img src="' + $this.data("hover") + '" class="thirdimg"><img src="' + $this.data("right") + '"></div></div>');
            
            if ($this.data("title")) {
                container.append('<div class="ulica">' + $this.data("title") + ' <a href="#top" class="pull-right">Na vrh</a></div>');
            }

            container.append(twenty);
            $this.replaceWith(container);

            twenty.find("img").width("100%");
            twenty.twentytwenty();

            $(".slider.hidden").first().removeClass("hidden");
            checkAllInView();
        });
    }

    loadSliderImgs($("#image-sliders .slider").first());
    checkAllInView();

    $(window).on("scroll", function () {
        checkAllInView();
    })

    // socials
    var text = "Prostovid: Uvid v sedanjost in možne prihodnosti slovenskega prostora";
    $(".icon-facebook").css("cursor", "pointer").on("click", function() {
        var a = "https://www.facebook.com/dialog/share?app_id=301375193309601&display=popup&href=" + encodeURIComponent(document.location.href) + "&redirect_uri=" + encodeURIComponent(document.location.href) + "&ref=responsive";
        return window.open(a, "_blank"),
        !1
    }),
    $(".icon-twitter").css("cursor", "pointer").on("click", function() {
        var a = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text + " " + document.location.href);
        return window.open(a, "_blank"),
        !1
    }),
    $(".icon-mail").css("cursor", "pointer").on("click", function() {
        var a = "mailto:?subject=Alternacija&body=" + text + " " + document.location.href;
        return window.open(a, "_blank"),
        !1
    });
    $(".icon-share").css("cursor", "pointer").on("click", function() {
        $('#modal-share').modal();
    });
});