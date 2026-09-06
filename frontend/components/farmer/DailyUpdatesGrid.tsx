'use client';

import React from 'react';
import { IndianRupee, CloudSun, Sprout, Lightbulb, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface DailyUpdatesGridProps {
  onCardClick?: (cardId: 'prices' | 'weather' | 'production' | 'advisory') => void;
}

export default function DailyUpdatesGrid({ onCardClick }: DailyUpdatesGridProps) {
  const { t } = useLanguage();

  const cards = [
    {
      id: 'prices' as const,
      title: t('cardPricesTitle'),
      desc: t('cardPricesDesc'),
      btnText: t('cardPricesBtn'),
      icon: IndianRupee,
      iconBg: 'bg-amber-100 text-amber-600',
      btnBg: 'bg-amber-100/90 hover:bg-amber-200 text-amber-900',
      borderColor: 'border-amber-100',
    },
    {
      id: 'weather' as const,
      title: t('cardWeatherTitle'),
      desc: t('cardWeatherDesc'),
      btnText: t('cardWeatherBtn'),
      icon: CloudSun,
      iconBg: 'bg-sky-100 text-sky-600',
      btnBg: 'bg-sky-100/90 hover:bg-sky-200 text-sky-900',
      borderColor: 'border-sky-100',
    },
    {
      id: 'production' as const,
      title: t('cardProductionTitle'),
      desc: t('cardProductionDesc'),
      btnText: t('cardProductionBtn'),
      icon: Sprout,
      iconBg: 'bg-emerald-100 text-emerald-700',
      btnBg: 'bg-emerald-100/90 hover:bg-emerald-200 text-emerald-900',
      borderColor: 'border-emerald-100',
    },
    {
      id: 'advisory' as const,
      title: t('cardAdvisoryTitle'),
      desc: t('cardAdvisoryDesc'),
      btnText: t('cardAdvisoryBtn'),
      icon: Lightbulb,
      iconBg: 'bg-purple-100 text-purple-700',
      btnBg: 'bg-purple-100/90 hover:bg-purple-200 text-purple-900',
      borderColor: 'border-purple-100',
    },
  ];

  return (
    <section className="space-y-4">
      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-left">
        {t('aajKiJaankari')}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onCardClick && onCardClick(card.id)}
              className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left group cursor-pointer"
            >
              <div>
                {/* Large Icon Badge */}
                <div className={`w-14 h-14 rounded-full ${card.iconBg} flex items-center justify-center mb-4 transition-transform group-hover:scale-105 shadow-2xs`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title & Description */}
                <h4 className="text-lg font-black text-slate-900 leading-snug">
                  {card.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Action Button matching mockup */}
              <div className="mt-5 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onCardClick) onCardClick(card.id);
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors ${card.btnBg} cursor-pointer`}
                >
                  <span>{card.btnText}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

