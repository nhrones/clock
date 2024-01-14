/// <reference lib="dom" />
import { CTX } from './dotPool.ts';
import { setAlpha } from "./clockFace.ts";
const $ = (id: string) => document.getElementById(id)

export const init = () => {

   const gravitySlider = $('gravity') as HTMLInputElement;
   const gravityValue = $('gravity-value') as HTMLInputElement;
   const bounceSlider = $('bounce') as HTMLInputElement;
   const bounceValue = $('bounce-value') as HTMLAnchorElement
   const velocitySlider = document.getElementById('velocity') as HTMLInputElement;
   const velocityValue = $('velocity-value') as HTMLInputElement;
   const trailsSlider = document.getElementById('trails-slider') as HTMLInputElement;
   const trailsValue = $('trails-value') as HTMLInputElement;

   // gravity
   gravitySlider.oninput = () => {
      gravityValue.innerHTML = `    Gravity: ${gravitySlider.value}%`;
      CTX.GravityY = parseInt(gravitySlider.value)
   };

   // bounce
   bounceSlider.oninput = () => {
      bounceValue.innerHTML = `    COR Restitution:   ${bounceSlider.value}%`;
      CTX.Restitution = parseInt(bounceSlider.value)
   };

   // velocity
   velocitySlider.oninput = () => {
      velocityValue.innerHTML = `    Velocity:  ${velocitySlider.value}%`;
      CTX.MaxVelocity = parseInt(velocitySlider.value)
   };

   // partical trails -- 
   trailsSlider.oninput = () => {
      trailsValue.innerHTML = `    Partical-Trails:  ${trailsSlider.value}%`;
      setAlpha(parseInt(trailsSlider.value));
   };
};

/** calculates a log slider value */
export function toLog(position: number): number {
   // position will be between 0 and 100
   const minp = 0;
   const maxp = 100;
   // The result will be between 0.5 an 0.01
   const minv = Math.log(0.5);  //   0% alpha
   const maxv = Math.log(0.025); // 90$ alpha
   // calculate adjustment factor
   const scale = (maxv - minv) / (maxp - minp);
   // return calculated log value
   return Math.exp(minv + scale * (position - minp));
}
