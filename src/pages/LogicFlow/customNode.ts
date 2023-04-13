import { nextTick } from 'vue'
import { HtmlNode, HtmlNodeModel } from '@logicflow/core'
import icon from './icon.png'

class CustomNode extends HtmlNode {
  private key = ''

  constructor(props: any) {
    super(props)
    this.setKey()
  }

  private setKey() {
    this.key = new Date().valueOf().toString()
  }

  private configHtml(rootEl: any) {
    const el = document.createElement('div')
    const { properties } = this.props.model
    const { serverUrl, intervalTime } = properties

    let rootDom: HTMLElement
    nextTick(() => {
      rootDom = document.getElementById(`${this.key}`)!
    })
    const getDom = (className: string) => {
      return rootDom?.getElementsByClassName(className)[0]
    }
    const setDomInnerHtml = (className: string, value: string) => {
      const dom = getDom(className)
      dom.innerHTML = value
    }

    let v = 0
    const html = `
      <div
        id="${this.key}"
        style="
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
        "
      >
        <div class="serverUrl">${serverUrl}</div>
        <div class="intervalTime">${intervalTime}</div>
        <div class="v">${v}</div>
        <image src="${icon}" style="width: 50px; height:50px;" />
      </div>
    `
    window.setInterval(() => {
      if (rootDom) {
        v++
        setDomInnerHtml('v', v.toString())
      }
    }, 1000)
    el.innerHTML = html
    rootEl.innerHTML = ''
    rootEl.appendChild(el)
  }

  setHtml(rootEl: any) {
    nextTick(() => this.configHtml(rootEl))
  }
}

class CustomNodeModel extends HtmlNodeModel {
  setAttributes(): void {
    this.width = 200
    this.height = 150
    this.text.editable = false
  }
}

export default {
  type: 'CustomNode',
  view: CustomNode,
  model: CustomNodeModel,
}
