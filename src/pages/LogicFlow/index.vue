<script setup lang="ts">
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { DndPanel, Menu, SelectionSelect } from '@logicflow/extension'
import node from './customNode'
import '@logicflow/extension/lib/style/index.css'

LogicFlow.use(Menu)
LogicFlow.use(DndPanel)
LogicFlow.use(SelectionSelect)

const lf = ref<LogicFlow>()
const container = ref<HTMLDivElement>()

const registerNode = () => {
  lf.value?.register(node)
}
const addMenuConfig = () => {
  lf.value!.extension.menu.addMenuConfig({
    nodeMenu: [
      {
        text: '分享',
        callback() {
          alert('分享成功！')
        },
      },
      {
        text: '属性',
        callback(node: any) {
          alert(`
          节点id: ${node.id}
          节点类型：${node.type}
          节点坐标：(x: ${node.x}, y: ${node.y})`)
        },
      },
    ],
    edgeMenu: [
      {
        text: '属性',
        callback(edge: any) {
          alert(`
          边id：${edge.id}
          边类型：${edge.type}
          边坐标：(x: ${edge.x}, y: ${edge.y})
          源节点id：${edge.sourceNodeId}
          目标节点id：${edge.targetNodeId}`)
        },
      },
    ],
    graphMenu: [
      {
        text: '分享',
        callback() {
          alert('分享成功！')
        },
      },
    ],
  })
}
const addDndPanel = () => {
  lf.value!.extension.dndPanel.setPatternItems([
    {
      label: '选区',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=',
      callback: () => {
        lf.value!.extension.selectionSelect.openSelectionSelect()
        lf.value!.once('selection:selected', () => {
          lf.value!.extension.selectionSelect.closeSelectionSelect()
        })
      },
    },
    {
      type: 'CustomNode',
      text: '',
      label: '充电桩',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==',
      properties: {
        serverUrl: 'This is serverUrl',
        intervalTime: 'Interval time is 3s',
      },
    },
  ])
}
const setupLogicFlow = () => {
  lf.value = new LogicFlow({
    container: unref(container) as HTMLElement,
    grid: true,
    plugins: [Menu, DndPanel, SelectionSelect],
  })
  addMenuConfig()
  addDndPanel()
}
const graph = {
  nodes: [
    {
      id: 'fba7fc7b-83a8-4edd-b4be-21f694a5d490',
      type: 'CustomNode',
      x: 200,
      y: 200,
      properties: {
        serverUrl: 'This is serverUrl',
        intervalTime: 'Interval time is 3s',
      },
    },
  ],
}
onMounted(() => {
  setupLogicFlow()
  registerNode()
  lf.value!.render(graph)
})
</script>

<template>
  <div ref="container" w-800px h-600px />
</template>
