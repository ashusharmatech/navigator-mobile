import { Application } from '@nativescript/core';
import { NavigatorApp } from './components/App.vue';

Application.run({ create: () => new NavigatorApp().$start() });