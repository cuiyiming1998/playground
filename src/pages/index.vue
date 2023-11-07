<script setup lang="ts">
const findMaxIndex = (arr: number[]) => {
  return arr.reduce((pre, cur, index, array) => {
    const preNum = array[pre]
    return cur > preNum ? index : pre
  }, 0)
}
const arr = [2, 10, 3, 5]
console.log(findMaxIndex(arr))
</script>

<template>
  <div>
    <div
      i-carbon-campsite
      text-4xl
      inline-block
    />

    <div
      style="justify-content: end; display: flex;"
    >
      123
    </div>
  </div>
</template>
