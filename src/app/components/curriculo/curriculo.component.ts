import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ViewportScroller } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { StepperModule } from 'primeng/stepper';

@Component({
  standalone: true,
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrl: './curriculo.component.css',
  imports: [
    MenubarModule,
    ButtonModule,
    CommonModule,
    DividerModule,
    StepperModule,
  ],
  styles: [
    `
      .p-stepper {
        flex-basis: 50rem;
      }
    `,
  ],
})
export class CurriculoComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {}
  items: MenuItem[] | undefined;
  phrases: string[] = [
    'Trabalho com front-end desde os 19 anos e sempre procurei me manter atualizado com as últimas tendências e tecnologias',
    'Estou sempre em busca de novos aprendizados para aprimorar minhas habilidades e criar soluções inovadoras',
    'Gosto de explorar novas ferramentas e técnicas para transformar ideias em realidade',
    'E minha paixão por aprender e evoluir constantemente me ajuda a enfrentar desafios e criar experiências impactantes para os usuários.',
  ];
  displayText = '';
  currentPhraseIndex = 0;
  private index = 0;
  private typingSpeed = 50;
  private eraseSpeed = 30;
  private delayBetweenPhrases = 1000;
  private intervalId: any;

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command: () => {
          this.viewportScroller.scrollToAnchor('content');
        },
      },
      {
        label: 'Sobre mim',
        icon: 'pi pi-user',
        command: () => {
          this.viewportScroller.scrollToAnchor('sobre-mim');
        },
      },
      {
        label: 'Experiencias',
        icon: 'pi pi-briefcase',
        command: () => {
          this.viewportScroller.scrollToAnchor('experiencias');
        },
      },
      {
        label: 'Contato',
        icon: 'pi pi-phone',
        command: () => {
          this.viewportScroller.scrollToAnchor('contato');
        },
      },
    ];

    this.startTyping();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startTyping(): void {
    this.intervalId = setInterval(() => {
      if (this.index < this.phrases[this.currentPhraseIndex].length) {
        this.displayText += this.phrases[this.currentPhraseIndex].charAt(
          this.index
        );
        this.index++;
      } else {
        // Quando a frase está completa, comece a apagar após um intervalo
        setTimeout(() => this.eraseText(), this.delayBetweenPhrases);
        clearInterval(this.intervalId);
      }
    }, this.typingSpeed);
  }

  private eraseText(): void {
    this.intervalId = setInterval(() => {
      if (this.displayText.length > 0) {
        this.displayText = this.displayText.slice(0, -1);
      } else {
        this.index = 0;
        this.currentPhraseIndex =
          (this.currentPhraseIndex + 1) % this.phrases.length;
        clearInterval(this.intervalId);
        this.startTyping();
      }
    }, this.eraseSpeed);
  }
}
