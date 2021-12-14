import { store } from 'react-notifications-component';

export function toast(type: any, message: string): void {

  store.addNotification({
    title: '',
    message,
    type: type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
}

