function replace_image (src, match) {
  let dst = src
  let tagObj = $(match[0])
  const label = $(tagObj[0]).data('sc-label')
  // debugger
  if (!label) {
    return src
  }
  let replace_str = `{{ if (sc_field i_item_artwork '${label} - Final') != '' sc_field
                  i_item_artwork '${label} - Final' [['class', 'img-fluid rounded'],
                  ['style', 'position: relative; top: 470px; left: 36px;']] else if
                  (sc_field i_item_artwork 'Artwork 1 - Daft') != '' sc_field
                  i_item_artwork '${label} - Daft' [['class', 'img-fluid rounded'],
                  ['style', 'position: relative; top: 470px; left: 36px;']] else sc_field
                  i_item_artwork '${label} - Key Visual' [['class', 'img-fluid rounded'],
                  ['style', 'position: relative; top: 470px; left: 36px;']] end }}`

  dst = dst.replace(match[0], replace_str)
  return dst
}

function replace_text (src, match) {
  let dst = src
  let replace_str = `{{ sc_field i_item_content '${match[1]}' }}`
  dst = dst.replace(match[0], replace_str)
  return dst
}

function gethtmlcodeconvert (valscript) {
  var valuescriban = `
        {{ i_item_artwork = sc_follow i_item 'Artwork' }}
          {{ i_item_content = sc_follow i_item 'Content' }}

        ` + valscript

  let regexp = new RegExp('<img(.|[\n\r])*?/>', 'g')
  let match
  while ((match = regexp.exec(valuescriban)) !== null) {
    console.log(`Found ${match[0]} start=${match.index} end=${regexp.lastIndex}.`)
    valuescriban = replace_image(valuescriban, match)
  }

  regexp = new RegExp('<!--START_TEXT\\[(.+?)\\]-->(.|[\n\r])*?<!--END_TEXT-->', 'g')

  while ((match = regexp.exec(valuescriban)) !== null) {
    console.log(`Found ${match[0]} ${match[1]} start=${match.index} end=${regexp.lastIndex}.`)
    valuescriban = replace_text(valuescriban, match)
  }

  return valuescriban
}
//
// module.exports = {
//   gethtmlcodeconvert,
//   replace_image,
//   replace_text
// }