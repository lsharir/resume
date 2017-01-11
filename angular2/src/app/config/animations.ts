import { trigger, state, style, transition, group, animate } from '@angular/core';

const ANIMATION_CONFIG = {
    FADE_TRANSITION_IN: '1s cubic-bezier(1,0,.5,.5)',
    FADE_TRANSITION_OUT: '0.25s ease-in-out',
    HEIGHT_TRANSITION: '1s ease-in-out',
    WIDTH_TRANSITION: '1s ease-in-out',
    MARGIN_TRANSITION: '1s ease-in-out',
    SUBJECT: { /** setting these values manually ensures the fluidity of the animation */
        MAX_HEIGHT: '14.5rem'
    },
    CATEGORY: { /** setting these values manually ensures the fluidity of the animation */
        MAX_HEIGHT: '2.0625rem',
        MARGIN: '0.5rem 0'
    },
    CONTACT_DATA: {
        MAX_HEIGHT: '1.375rem',
        MAX_WIDTH: '9rem',
        MARGIN: '1rem'
    }
}

/** Before importing a trigger, it is important to include the binding [@inOut]="'in'" in the relevant element */

export const SUBJECT_ANIMATION = {
    trigger: trigger('inOut', [
        state('in', style({ opacity: 1, 'max-height': ANIMATION_CONFIG.SUBJECT.MAX_HEIGHT })),
        transition('void => *', [
            style({ opacity: 0, 'max-height': 0 }),
            group([
                animate(ANIMATION_CONFIG.FADE_TRANSITION_IN, style({ opacity: 1})),
                animate(ANIMATION_CONFIG.HEIGHT_TRANSITION, style({ 'max-height': ANIMATION_CONFIG.SUBJECT.MAX_HEIGHT }))
            ])
        ]),
        transition('* => void', [
            group([
                animate(ANIMATION_CONFIG.FADE_TRANSITION_OUT, style({ opacity: 0 })),
                animate(ANIMATION_CONFIG.HEIGHT_TRANSITION, style({ 'max-height': 0 }))
            ])
        ])
    ])
}

export const CATEGORY_ANIMATION = {
    trigger: trigger('inOut', [
        state('in', style(
            { 
                opacity: 1, 
                'max-height': ANIMATION_CONFIG.CATEGORY.MAX_HEIGHT,
                margin: ANIMATION_CONFIG.CATEGORY.MARGIN
            }
        )),
        transition('void => *', [
            style({ opacity: 0, 'max-height': 0, 'margin': 0 }),
            group([
                animate(ANIMATION_CONFIG.FADE_TRANSITION_IN, style({ opacity: 1})),
                animate(ANIMATION_CONFIG.HEIGHT_TRANSITION, style({ 'max-height': ANIMATION_CONFIG.CATEGORY.MAX_HEIGHT })),
                animate(ANIMATION_CONFIG.HEIGHT_TRANSITION, style({ margin: ANIMATION_CONFIG.CATEGORY.MARGIN }))
            ])
        ]),
        transition('* => void', [
            group([
                animate(ANIMATION_CONFIG.FADE_TRANSITION_OUT, style({ opacity: 0 })),
                animate(ANIMATION_CONFIG.HEIGHT_TRANSITION, style({ 'max-height': 0 })),
                animate(ANIMATION_CONFIG.HEIGHT_TRANSITION, style({ margin: 0 }))
            ])
        ])
    ])
}

export const CONTACT_DATA_ANIMATION = {
    trigger: trigger('inOut', [
        state('in', style(
            { 
                opacity: 1, 
                'max-height': ANIMATION_CONFIG.CONTACT_DATA.MAX_HEIGHT,
                'max-width': ANIMATION_CONFIG.CONTACT_DATA.MAX_WIDTH,
                margin: ANIMATION_CONFIG.CONTACT_DATA.MARGIN
            }
        )),
        transition('void => *', [
            style({ opacity: 0, 'max-height': 0, 'max-width': 0, margin: 0 }),
            group([
                animate(ANIMATION_CONFIG.FADE_TRANSITION_IN, style({ opacity: 1})),
                animate(ANIMATION_CONFIG.HEIGHT_TRANSITION, style({ 'max-height': ANIMATION_CONFIG.CONTACT_DATA.MAX_HEIGHT })),
                animate(ANIMATION_CONFIG.WIDTH_TRANSITION, style({ 'max-width': ANIMATION_CONFIG.CONTACT_DATA.MAX_WIDTH })),
                animate(ANIMATION_CONFIG.MARGIN_TRANSITION, style({ margin: ANIMATION_CONFIG.CONTACT_DATA.MARGIN }))
            ])
        ]),
        transition('* => void', [
            style({ opacity: 1 }),
            group([
                animate(ANIMATION_CONFIG.FADE_TRANSITION_IN, style({ opacity: 0})),
                animate(ANIMATION_CONFIG.HEIGHT_TRANSITION, style({ 'max-height': 0 })),
                animate(ANIMATION_CONFIG.WIDTH_TRANSITION, style({ 'max-width': 0 })),
                animate(ANIMATION_CONFIG.MARGIN_TRANSITION, style({ margin: 0 }))
            ])
        ])
    ])
}