import { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';

interface Menu {
  id: number;
  label: string;
  subMenus: SubMenu[];
}

interface SubMenu {
  id: number;
  label: string;
}