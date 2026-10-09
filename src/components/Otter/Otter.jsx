import { useTranslation } from "../../i18n";

const Otter = ({ equipped, isCelebrating, isFocusing, noiseTone, showAccessorySlots = false }) => {
  const { t } = useTranslation();
  const isLoud = noiseTone === "loud";
  const state = isCelebrating ? "celebrating" : isLoud ? "loud" : isFocusing ? "focusing" : "idle";
  const stateLabels = {
    celebrating: t("otter.stateCelebrating"),
    focusing: t("otter.atDesk"),
    idle: t("otter.stateIdle"),
    loud: t("otter.stateLoud"),
  };

  return (
    <div className={`otter-scene state-${state}`}>
      <p className="otter-message" aria-live="polite">{t(`otter.${state}`)}</p>
      <span className="sparkle one" aria-hidden="true">✦</span>
      <span className="sparkle two" aria-hidden="true">✦</span>
      <div className="otter" role="img" aria-label={stateLabels[state]}>
        <svg className="otter-svg" viewBox="0 0 220 220" aria-hidden="true">
          <g className="focus-chair">
            <path d="M48 126 Q42 126 42 135 L42 203" />
            <path d="M42 171 H72" />
          </g>
          <path className="otter-tail" d="M152 156 C181 172 205 159 208 135 C210 122 201 114 193 118 C186 122 192 133 184 141 C175 150 161 148 150 142Z" />
          <path className="otter-tail-shade" d="M157 154 C178 162 198 154 204 136 C201 152 184 162 166 160Z" />
          <g className="otter-leg otter-leg-left">
            <path className="otter-limb-line" d="M84 172 C82 186 78 196 72 202" />
            <path className="otter-limb-fur" d="M84 172 C82 186 78 196 72 202" />
            <ellipse className="otter-foot" cx="66" cy="205" rx="14" ry="8.5" />
            <path className="otter-toes" d="M58 204 V208 M65 205 V209" />
          </g>
          <g className="otter-leg otter-leg-right">
            <path className="otter-limb-line" d="M136 172 C138 186 142 196 148 202" />
            <path className="otter-limb-fur" d="M136 172 C138 186 142 196 148 202" />
            <ellipse className="otter-foot" cx="154" cy="205" rx="14" ry="8.5" />
            <path className="otter-toes" d="M162 204 V208 M155 205 V209" />
          </g>
          <g className="otter-arm otter-arm-left">
            <path className="otter-limb-line" d="M52 116 C44 128 37 139 33 147" />
            <path className="otter-limb-fur" d="M52 116 C44 128 37 139 33 147" />
            <circle className="otter-paw" cx="31" cy="152" r="8.5" />
          </g>
          <g className="otter-arm otter-arm-right">
            <path className="otter-limb-line" d="M168 116 C176 128 183 139 187 147" />
            <path className="otter-limb-fur" d="M168 116 C176 128 183 139 187 147" />
            <circle className="otter-paw" cx="189" cy="152" r="8.5" />
          </g>
          <g className="otter-ear otter-ear-left"><circle cx="59" cy="45" r="17" /></g>
          <g className="otter-ear otter-ear-right"><circle cx="161" cy="45" r="17" /></g>
          <path className="otter-blob" d="M104 25 C76 27 47 48 43 85 C42 90 41 93 39 96 C41 97 42 97 43 98 C42 102 40 105 36 108 C39 110 42 110 45 111 C45 122 52 132 62 139 C46 148 39 166 48 182 C60 199 160 199 172 182 C181 166 174 148 158 139 C168 132 175 122 175 111 C178 110 181 110 184 108 C180 105 178 102 177 98 C178 97 179 97 181 96 C179 93 178 90 177 85 C173 48 144 27 116 25 C114 21 115 17 119 13 C113 14 110 17 109 21 C107 17 103 15 98 15 C102 18 104 21 104 25Z" />
          <path className="otter-shade" d="M146 33 C165 45 175 62 177 85 C179 104 172 124 161 136 C166 118 168 100 166 84 C164 62 157 46 146 33Z" />
          <path className="otter-shade" d="M45 168 C50 186 76 194 110 194 C144 194 170 186 175 168 C172 184 150 197 110 197 C70 197 48 184 45 168Z" />
          <path className="otter-shine" d="M64 63 C68 51 78 42 90 38 C82 45 75 53 71 63 C69 68 63 67 64 63Z" />
          <ellipse className="otter-belly" cx="110" cy="160" rx="45" ry="33" />
          <path className="otter-belly-shade" d="M68 168 C76 186 94 193 110 193 C126 193 144 186 152 168 C142 182 126 187 110 187 C94 187 78 182 68 168Z" />
          <path className="otter-belly-shine" d="M80 153 C79 144 85 137 93 134 C89 139 87 146 87 153 C86 158 80 158 80 153Z" />
          <ellipse className="otter-ear-inner" cx="58" cy="44" rx="8" ry="8.5" />
          <ellipse className="otter-ear-inner" cx="162" cy="44" rx="8" ry="8.5" />
          <g className="otter-face">
            <ellipse className="otter-blush" cx="67" cy="108" rx="10" ry="6" />
            <ellipse className="otter-blush" cx="153" cy="106" rx="10" ry="6" />
            <path className="otter-muzzle" d="M110 104 C100 98 80 101 80 118 C80 132 94 139 110 137 C126 139 140 132 140 118 C140 101 120 98 110 104Z" />
            <path className="otter-whiskers" d="M80 115 C74 112 68 111 61 112 M80 123 C74 123 69 124 63 127 M140 115 C146 112 152 111 159 112 M140 123 C146 123 151 124 157 127" />
            <g className="otter-eye otter-eye-left"><ellipse cx="86" cy="91" rx="7.5" ry="10.5" /><circle cx="83.5" cy="87" r="3.2" /><circle className="otter-glint-small" cx="89" cy="95.5" r="1.5" /></g>
            <g className="otter-eye otter-eye-right"><ellipse cx="136" cy="89" rx="7.5" ry="10.5" /><circle cx="133.5" cy="85" r="3.2" /><circle className="otter-glint-small" cx="139" cy="93.5" r="1.5" /></g>
            <path className="otter-nose" d="M110 100 C119 100 123 104 120 109 C117 114 113 116 110 116 C107 116 103 114 100 109 C97 104 101 100 110 100Z" />
            <path className="otter-nose-shine" d="M104 104 C106 102 110 102 112 103" />
            <path className="otter-mouth otter-mouth-smile" d="M110 116 L110 121 M110 121 C107 129 98 129 95 122 M110 121 C113 129 122 129 125 122" />
            <path className="otter-mouth otter-mouth-focus" d="M110 116 L110 122 M100 125 C105 122 115 122 120 125" />
            <ellipse className="otter-mouth otter-mouth-loud" cx="110" cy="128" rx="9" ry="9.5" />
            <path className="otter-mouth otter-mouth-celebrate" d="M93 120 C99 141 121 141 127 118 C116 125 104 125 93 120Z" />
          </g>
          <path className="otter-heart" transform="translate(5 7)" d="M105 153 C98 145 86 153 105 169 C124 151 112 145 105 153Z" />
          {equipped.includes("glasses") && (
            <g className="otter-glasses">
              <rect x="72" y="78" width="31" height="24" rx="10" />
              <rect x="121" y="76" width="31" height="24" rx="10" />
              <path d="M103 87 C109 84 115 84 121 86 M72 86 L60 82 M152 84 L163 79" />
              <path className="glasses-shine" d="m78 83 8 14m5-14 7 12m36-14 8 14" />
            </g>
          )}
          {equipped.includes("party-hat") && (
            <g className="otter-hat" transform="translate(-6 0)">
              <path d="M88 39 L123 3 L144 47Z" />
              <path d="M101 26 L132 34 M113 14 L138 42" />
              <circle className="hat-dot" cx="118" cy="31" r="3" />
              <circle cx="123" cy="4" r="6" />
            </g>
          )}
          {equipped.includes("bow-tie") && (
            <g className="otter-bow" transform="translate(5 -24)">
              <path d="M105 162C88 148 72 147 70 157v14c5 10 21 4 35-9 14 13 30 19 35 9v-14c-2-10-18-9-35 5Z" />
              <circle cx="105" cy="162" r="8" />
            </g>
          )}
          {showAccessorySlots && !equipped.includes("glasses") && (
            <g className="accessory-placeholder otter-glasses">
              <rect x="72" y="78" width="31" height="24" rx="10" />
              <rect x="121" y="76" width="31" height="24" rx="10" />
              <path d="M103 87 C109 84 115 84 121 86" />
            </g>
          )}
          {showAccessorySlots && !equipped.includes("party-hat") && (
            <path className="accessory-placeholder" d="M82 45 L117 7 L145 48Z" />
          )}
          {showAccessorySlots && !equipped.includes("bow-tie") && (
            <path className="accessory-placeholder" d="M110 143 C92 130 78 133 76 143v12c6 8 21 2 34-9 13 11 28 17 34 9v-12c-2-10-16-13-34 0Z" />
          )}
          <g className="focus-workspace">
            <path className="desk-top" d="M17 157 Q17 151 23 151 H197 Q203 151 203 157 V166 H17Z" />
            <path className="desk-front" d="M25 166 H195 L188 184 H32Z" />
            <path className="desk-leg" d="M39 181 L35 220 M181 181 L185 220" />
            <g className="focus-paper">
              <path d="M82 145 L151 145 L165 160 H72Z" />
              <path className="paper-line line-one" d="M93 151 H134" />
              <path className="paper-line line-two" d="M88 156 H126" />
            </g>
            <g className="focus-arm-resting">
              <path className="otter-limb-line" d="M54 120 Q70 142 89 150" />
              <path className="otter-limb-fur" d="M54 120 Q70 142 89 150" />
              <ellipse className="focus-paw" cx="92" cy="151" rx="9" ry="7" />
            </g>
            <g className="focus-scratch-arm">
              <path className="otter-limb-line" d="M54 120 Q47 92 64 72" />
              <path className="otter-limb-fur" d="M54 120 Q47 92 64 72" />
              <ellipse className="focus-paw" cx="67" cy="66" rx="8.5" ry="7.5" />
              <path className="scratch-lines" d="M75 57 L81 52 M78 64 L85 62" />
            </g>
            <g className="focus-writing-arm">
              <path className="otter-limb-line" d="M166 119 Q153 139 134 149" />
              <path className="otter-limb-fur" d="M166 119 Q153 139 134 149" />
              <ellipse className="focus-paw" cx="130" cy="151" rx="9.5" ry="7.5" />
              <g className="focus-pencil">
                <path className="pencil-body" d="M129 150 L151 132" />
                <path className="pencil-tip" d="M126 153 L130 148" />
                <path className="pencil-eraser" d="M149 134 L153 130" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default Otter;
