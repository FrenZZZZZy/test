let sHTML = {
	Box: (args) => {
		let title = $('<span />').addClass('title').html(args['title']);
		let close = $('<span />').attr('id', args['id'] + 'close').addClass('wclose'), 
			head = $('<div />').attr('id', args['id'] + 'Header').attr('class', 'whead').append(title),
			body = $('<div />').attr('id', args['id'] + 'Body').attr('class', 'wbody'),
			div = $('<div />').attr('id', args['id']).attr('class', 'wb open').append(head).append(body).hide();

		if (args['auto_close'] !== false) {
			head.append(close);
		}
		if (args['minimize']) {
			let min = $('<span />').addClass('wmini');
			min.insertAfter(title);
		}
		if (args['resize']) {
			sHTML.Resizeable(args['id'], args['keepRatio']);
		}
		if (args['minimize']) {
			sHTML.MinimizeBox(div);
		}
		$('body').append(div).promise().done(function () {
			setTimeout(() => {
				sHTML.BringToFront(div);
			}, 300);

			if (args['auto_close']) {
				$(`#${args.id}`).on('click', `#${args['id']}close`, function () {
					$('#' + args['id']).fadeToggle('fast', function () {
						$(this).remove();
					});
				});
			}

			if (args['dragdrop']) {
				sHTML.DragBox(document.getElementById(args['id']));
			}
			div.fadeToggle('fast');
			$(`#${args['id']}`).on('keydown keyup', (e) => {
				e.stopPropagation();
			});
		});
	},
	MinimizeBox: (div) => {
		let btn = $(div).find('.wmini');

		$(btn).bind('click', function () {
			let box = $(this).closest('.wb'),
				open = box.hasClass('open');

			if (open === true) {
				box.removeClass('open');
				box.addClass('closed');
				box.find('.wbody').css("visibility", "hidden");
			}
			else {
				box.removeClass('closed');
				box.addClass('open');
				box.find('.wbody').css("visibility", "visible");
			}
		});
	},
    BringToFront: ($this) => {
		$('.wb').removeClass('ot');

		$this.addClass('ot');
	},
	DragBox: (el) => {

		document.getElementById(el.id + "Header").removeEventListener("pointerdown", dragMouseDown);

		let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, top = 0, left = 0, id;

		id = el.id;

		if (document.getElementById(el.id + "Header")) {
			document.getElementById(el.id + "Header").onpointerdown = dragMouseDown;
		} else {
			el.onpointerdown = dragMouseDown;
		}

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();

			pos3 = e.clientX;
			pos4 = e.clientY;

			document.onpointerup = closeDragElement;
			document.onpointermove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();

			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;

			top = (el.offsetTop - pos2);
			left = (el.offsetLeft - pos1);

			// Schutz gegen "zu Hoch geschoben"
			if (top < 0) {
				top = 12;

				document.onpointerup = null;
				document.onpointermove = null;
			}

			el.style.top = top + "px";
			el.style.left = left + "px";
		}

		function closeDragElement() {
			document.onpointerup = null;
			document.onpointermove = null;
		}
	},
	ShowToastMsg: (d) => {
		$('.jq-toast-wrap').remove();
		$.toast({
			heading: d['head'],
			text: d['text'],
			icon: d['type'],
			hideAfter: d['hideAfter'],
			position: 'bottom-right'
		});
	},
	AddCssFile: (modul) => {
		// prüfen ob schon geladen
		if ($('#' + modul + '-css').length > 0) {
			return;
		}

		// noch nicht im DOM, einfügen
		let cssUrl = '../css/' + modul + '.css';

		let css = $('<link />')
			.attr('href', cssUrl)
			.attr('id', modul + '-css')
			.attr('rel', 'stylesheet');

		$('head').append(css);
	},
	CloseOpenBox: (cssid) => {

		let box = $('#' + cssid);

		if (box.length > 0) {
			$(box).fadeToggle('fast', function () {
				$(this).remove();
			});
		}

		return false;
	}
};