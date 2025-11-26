<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const handleTabClick = (tabId) => {
  emit('update:modelValue', tabId)
}
</script>

<template>
  <div class="flex border-b border-gray-200 mb-6">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="handleTabClick(tab.id)"
      :class="[
        'flex-1 py-2 px-4 text-sm font-medium text-center transition-colors border-b-2',
        modelValue === tab.id
          ? 'text-blue-600 border-blue-600'
          : 'text-gray-500 border-transparent hover:text-gray-700'
      ]"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
