/* eslint-disable linebreak-style */
import { NOTIFICATION_TIMEOUT } from '@/config';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<{ message: string; type: 'success' | 'error' }[]>([]);

  const addNotification = (message: string, type: 'success' | 'error') => {
    notifications.value.push({ message, type });
    setTimeout(() => {
      notifications.value.shift();
    }, NOTIFICATION_TIMEOUT);
  };

  return { notifications, addNotification };
});

export default useNotificationStore;
