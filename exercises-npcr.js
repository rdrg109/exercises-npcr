var WordGueser = class WordGueser {
  constructor() {
    this.data = null
    this.missingField = null
    this.instruction = null
    this.labelsOfAttributes = {
      'spanish-translation': '西语翻译',
      'lexical-category': '词性',
      'simplified-chinese-characters': '汉字',
      'pinyin': '拼音'
    }
  }

  getLabelOfMissingAttribute() {
    return this.labelsOfAttributes[this.missingField]
  }

  getAttributeNode(label, content) {
    var attributeNode = document.createElement('div')
    var labelNode = document.createElement('div')
    labelNode.textContent = label + '：'
    labelNode.style.display = 'inline-block'
    var contentNode = document.createElement('div')
    contentNode.textContent = content
    contentNode.style.display = 'inline-block'
    attributeNode.appendChild(labelNode)
    attributeNode.appendChild(contentNode)
    return attributeNode
  }

  getInstruction() {
    var instruction = document.createElement('div')
    instruction.innerHTML = '<b>' + this.getLabelOfMissingAttribute() + '</b>是什么？'
    instruction.style.border = '1px solid black'
    instruction.style.display = 'inline-block'
    instruction.style.padding = '10px'
    return instruction
  }

  getFields() {
    var container = document.createElement('div')
    container.style.textAlign = 'left'
    container.style.maxWidth = '70%'
    container.style.display = 'inline-block'
    container.style.margin = 'auto'

    if(this.missingField != 'simplified-chinese-characters')
      container.appendChild(this.getAttributeNode('汉字', data['simplified-chinese-characters']))

    if(this.missingField != 'pinyin')
      container.appendChild(this.getAttributeNode('拼音', data['pinyin']))

    if(this.missingField != 'lexical-category') {
      container.appendChild(this.getAttributeNode('词性', data['lexical-category']))
      var lexicalCategory = document.createElement('div')
      container.appendChild(lexicalCategory)
    }

    if(this.missingField != 'spanish-translation') {
      container.appendChild(this.getAttributeNode('西语翻译', data['spanish-translation']))
    }

    container.appendChild(this.getInstruction())
    return container
  }
}
