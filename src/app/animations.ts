import { trigger, transition, animate, style, query, stagger } from '@angular/animations';

export const listAnimation = trigger('listAnimation', [

  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        stagger(
          '400ms',
          animate(
            '400ms ease-in',
            style({ opacity: 1, transform: 'translateY(0px)' }),
          ),
        ),
      ],
      { optional: true },
    ),
    query(
      ':leave',
      [animate('400ms', style({ opacity: 0, transform: 'rotate(90deg)' }))],
      {
        optional: true,
      },
    ),
  ])

]);
