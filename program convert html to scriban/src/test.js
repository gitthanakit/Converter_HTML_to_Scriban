const {replace_image,replace_text} = require('./convert_util.js')

test('image', () => {
  const src = ' <img\n' +
    '                          data-sc-label="Artwork 1"\n' +
    '                          src="../images/image-promote-main.png"\n' +
    '                          class="img-fluid rounded"\n' +
    '                          alt="promote-image"\n' +
    '                          style="position: relative; top: 470px; left: 36px"\n' +
    '                      />'
  const tobe = '{{ if (sc_field i_item_artwork \'Artwork 1 - Final\') != \'\' sc_field\n' +
    '                  i_item_artwork \'Artwork 1 - Final\' [[\'class\', \'img-fluid rounded\'],\n' +
    '                  [\'style\', \'position: relative; top: 470px; left: 36px;\']] else if\n' +
    '                  (sc_field i_item_artwork \'Artwork 1 - Daft\') != \'\' sc_field\n' +
    '                  i_item_artwork \'Artwork 1 - Daft\' [[\'class\', \'img-fluid rounded\'],\n' +
    '                  [\'style\', \'position: relative; top: 470px; left: 36px;\']] else sc_field\n' +
    '                  i_item_artwork \'Artwork 1 - Key Visual\' [[\'class\', \'img-fluid rounded\'],\n' +
    '                  [\'style\', \'position: relative; top: 470px; left: 36px;\']] end }}'
  expect(replace_image(src, src)).toBe(tobe)
})

test('text1', () => {
  const src = '<!--START_TEXT[Title1]-->ฝากประจำตามใจ<!--END_TEXT-->'
  const tobe = '{{ sc_field i_item_content \'Title1\' }}'
  expect(replace_text(src, src)).toBe(tobe)
})