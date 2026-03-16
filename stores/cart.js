import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cartApi } from '@/api/services'

export const useCartStore = defineStore('cart', () => {

  const items = ref([])

  const count   = computed(() => items.value.length)
  const isEmpty = computed(() => items.value.length === 0)

  async function fetchCart() {
    const res = await cartApi.get()
    if (res.success) items.value = res.data.cartItems || []
  }

  async function addItem(data) {
    const res = await cartApi.add(data)
    if (res.success) await fetchCart()
    return res
  }

  async function clearAll() {
    const res = await cartApi.clear()
    if (res.success) items.value = []
    return res
  }

  return { items, count, isEmpty, fetchCart, addItem, clearAll }
})
