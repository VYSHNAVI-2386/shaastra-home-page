import miLogo from '../assets/patrons/mi_Logo.png';
import diLogo from '../assets/patrons/di_Logo.png';
import unescoLogo from '../assets/patrons/unesco_Logo.png';
import ngedLogo from '../assets/patrons/negd_Logo.png';
import startupTNLogo from '../assets/patrons/startupTN_Logo.png';
import udgiLogo from '../assets/patrons/udgi_Logo.png';
import yifLogo from '../assets/patrons/yif_Logo.png';

export interface patronCard {
  // name: string;
  type: 'arcade' | 'mega' | 'retro';
  image: string;
}

export const patrons: patronCard[] = [
  { 
    // name: 'Make in India', 
    type: 'arcade',
    image: miLogo
  },
  { 
    // name: 'Digital India', 
    type: 'arcade',
    image: diLogo
  },
  { 
    // name: 'UNESCO', 
    type: 'mega',
    image: unescoLogo
  },
  {
    // name: 'National e-Governance Division',
    type: 'retro',
    image: ngedLogo
  },
  {
    // name: 'Startup TN',
    type: 'retro',
    image: startupTNLogo
  },
  {
    // name: 'Urban Development & Governance Institute',
    type: 'retro',
    image: udgiLogo
  },
  {
    // name: 'Youth India',
    type: 'arcade',
    image: yifLogo,
  }

];