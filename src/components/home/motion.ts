/* Homepage motion, ported from the approved prototype (storyboard: Figma "Proposed · Home motion").
   Hero: a dozing dog thinks up the schema, walks the progress track, digs, inspects, deploys; a face pack
   arrives, confetti, then the second change lands in the same pattern. Frontend stack: the query chain builds.
   How it works: one scene per step, scroll-linked. Deploy band: a pack of face dogs that grows.
   Reduced motion shows final states. Everything is torn down by the returned cleanup. */

type Pt = { x: number; y: number };
interface DogEl extends HTMLElement {
  mood?: string;
  look?: () => Pt | null;
  follow?: () => boolean;
  petting?: boolean;
  petT?: number;
  lx?: number;
  ly?: number;
  x?: number;
  next?: number;
  lookAt?: HTMLElement | null;
}
interface Anim {
  play(): void;
  setSpeed(s: number): void;
  goToAndStop(f: number, isFrame: boolean): void;
  destroy(): void;
}
interface StepEl extends HTMLElement {
  tm?: number[];
}

const stubAnim: Anim = { play() {}, setSpeed() {}, goToAndStop() {}, destroy() {} };
// Frame 6 is the standing pose. The web app played this walk with a 500ms cycle; the Lottie's own is 833ms.
const REST = 6;
const WALK = 833 / 500;
const FIRST_INTENT = "A multi-tenant project workspace with members and tasks";
const SECOND_INTENT = "Add team invitations.";

export function startHomeMotion(root: HTMLElement): () => void {
  const timers = new Set<number>();
  const intervals = new Set<number>();
  const observers: IntersectionObserver[] = [];
  const unlisten: Array<() => void> = [];
  let raf = 0;
  let alive = true;

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      if (alive) fn();
    }, ms);
    timers.add(id);
    return id;
  };
  const cancel = (id?: number) => {
    if (id) {
      clearTimeout(id);
      timers.delete(id);
    }
  };
  const on = <K extends keyof WindowEventMap>(type: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions) => {
    window.addEventListener(type, fn, opts);
    unlisten.push(() => window.removeEventListener(type, fn, opts));
  };
  const observe = (cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) => {
    const io = new IntersectionObserver(cb, opts);
    observers.push(io);
    return io;
  };
  const $ = <T extends HTMLElement = HTMLElement>(name: string) => root.querySelector<T>(`[data-hm="${name}"]`)!;
  const q = <T extends Element = HTMLElement>(el: Element, sel: string) => Array.from(el.querySelectorAll<T & Element>(sel)) as T[];

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => mq.matches;
  const applyRm = () => root.classList.toggle("rm", reduced());
  applyRm();
  mq.addEventListener("change", applyRm);
  unlisten.push(() => mq.removeEventListener("change", applyRm));

  const pulse = (el: HTMLElement, cls: string, ms: number) => {
    if (reduced()) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
    later(() => el.classList.remove(cls), ms);
  };
  const onceInView = (el: Element, fn: () => void, threshold = 0.35) => {
    const io = observe(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect();
          fn();
        }
      },
      { threshold },
    );
    io.observe(el);
  };
  const pt = (el: Element): Pt => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  /* ---------- Dog life: blink, twitch an ear, look at something, enjoy being petted ---------- */
  const ptr = { x: 0, y: 0, t: -1e9 };
  on("pointermove", (e) => {
    if (e.pointerType === "mouse") Object.assign(ptr, { x: e.clientX, y: e.clientY, t: performance.now() });
  }, { passive: true });
  const seen = new Set<DogEl>();
  const vio = observe((es) => es.forEach((e) => (e.isIntersecting ? seen.add(e.target as DogEl) : seen.delete(e.target as DogEl))));
  const awake = (d: DogEl) => d.dataset.mood !== "sleep";
  const setMood = (d: DogEl, m: string) => {
    d.mood = m;
    if (!d.petting) d.dataset.mood = m;
  };
  const blink = (d: HTMLElement, twice = false) => {
    d.classList.add("blink");
    later(() => d.classList.remove("blink"), 130);
    if (twice) later(() => blink(d), 280);
  };
  const twitch = (d: HTMLElement, side?: "l" | "r") => pulse(d, "tw-" + (side || (Math.random() < 0.5 ? "l" : "r")), 340);
  const adopt = (d: DogEl) => {
    vio.observe(d);
    d.mood = d.dataset.mood;
    d.look = () => null;
    d.follow = () => true;
    const pet = () => {
      if (d.mood === "sleep") {
        twitch(d, "l");
        later(() => twitch(d, "r"), 200);
        return;
      }
      d.petting = true;
      d.dataset.mood = "happy";
      d.classList.add("perk");
      pulse(d, "hop", 560);
      pulse(d, "pant", 1470);
      later(() => blink(d, true), 600);
      cancel(d.petT);
      d.petT = later(() => {
        d.petting = false;
        d.classList.remove("perk");
        d.dataset.mood = d.mood;
      }, 1700);
    };
    d.addEventListener("click", pet);
    unlisten.push(() => d.removeEventListener("click", pet));
  };
  q<DogEl>(root, ".dog").forEach((d) => {
    if (!d.closest('[data-hm="dog-tpl"]')) adopt(d);
  });
  const tpl = $("dog-tpl").firstElementChild as HTMLElement;
  const makeFace = (mood: string, k: number | string, cls: string) => {
    const d = tpl.cloneNode(true) as DogEl;
    d.classList.add(cls);
    d.dataset.mood = mood;
    d.style.setProperty("--k", String(k));
    return d;
  };

  const idle = () => {
    seen.forEach((d) => {
      if (awake(d) && Math.random() < 0.3) blink(d, Math.random() < 0.2);
      else if (Math.random() < (awake(d) ? 0.06 : 0.12)) twitch(d);
    });
    later(idle, 700 + Math.random() * 600);
  };
  idle();
  const gaze = () => {
    const now = performance.now();
    seen.forEach((d) => {
      if (!d.look) return;
      let lx = 0;
      let ly = 0;
      if (awake(d) && !reduced()) {
        const t = d.follow!() && now - ptr.t < 3500 ? ptr : d.look();
        if (t) {
          const r = d.getBoundingClientRect();
          lx = Math.max(-1, Math.min(1, (t.x - (r.left + r.width / 2)) / 280));
          ly = Math.max(-1, Math.min(1, (t.y - (r.top + r.height * 0.4)) / 220));
        }
      }
      if (Math.abs(lx - (d.lx || 0)) > 0.02 || Math.abs(ly - (d.ly || 0)) > 0.02) {
        d.lx = lx;
        d.ly = ly;
        d.style.setProperty("--lx", lx.toFixed(2));
        d.style.setProperty("--ly", ly.toFixed(2));
      }
    });
    raf = requestAnimationFrame(gaze);
  };
  raf = requestAnimationFrame(gaze);

  /* ---------- Hero ---------- */
  const stage = $("stage");
  const dog = root.querySelector<DogEl>("#hm-hero-dog")!;
  const intent = $("intent");
  const itext = $("itext");
  const status = $("status");
  const scope = $("scope");
  const rider = $("rider");
  const walker = $("walker");
  const thought = $("thought");
  const caret = intent.querySelector<HTMLElement>(".caret")!;
  const cols = q(stage, '[data-hm="col"]');
  let anim: Anim = stubAnim;
  let busy = false;
  let played = false;
  let tgt: HTMLElement | null = null;
  let frac = 1;
  let riderX: number | null = null;
  let digI = 0;
  let pack: DogEl[] = [];
  dog.look = () => (tgt ? pt(tgt) : null);
  dog.follow = () => !busy;

  // lottie-web loads only once the hero is near the viewport.
  const lottieIo = observe(
    (es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      lottieIo.disconnect();
      Promise.all([import("lottie-web/build/player/lottie_light"), fetch("/lottie/dog-walk.json").then((r) => r.json())])
        .then(([mod, data]) => {
          if (!alive) return;
          const lottie = mod.default;
          anim = lottie.loadAnimation({
            container: walker.querySelector(".lot")!,
            renderer: "svg",
            loop: true,
            autoplay: false,
            animationData: data,
          }) as unknown as Anim;
          anim.goToAndStop(REST, true);
          if (walker.classList.contains("walking")) setWalking(true, WALK);
        })
        .catch(() => {});
    },
    { rootMargin: "400px" },
  );
  lottieIo.observe(stage);

  const setWalking = (isOn: boolean, speed = 1) => {
    walker.classList.toggle("walking", isOn);
    if (isOn && !reduced()) {
      anim.setSpeed(speed);
      anim.play();
    } else anim.goToAndStop(REST, true);
  };
  const at = (ms: number, fn: () => void) => later(fn, ms);
  let heroTimers: number[] = [];
  const ht = (ms: number, fn: () => void) => heroTimers.push(at(ms, fn));

  // Walk to a point along the track (0..1). Returns how long the walk takes.
  function walkTo(f: number, opts: { trot?: boolean; instant?: boolean } = {}) {
    frac = f;
    const W = stage.clientWidth;
    const w = rider.offsetWidth;
    const x = Math.round(Math.max(0, Math.min(W - w, f * W - w / 2)));
    const from = riderX == null ? x : riderX;
    const per = opts.trot ? 2.4 : 4.4;
    const ms =
      opts.instant || reduced() || Math.abs(x - from) < 4
        ? 0
        : Math.round(Math.min(2800, Math.max(opts.trot ? 700 : 1200, Math.abs(x - from) * per)));
    riderX = x;
    stage.style.setProperty("--dur", ms + "ms");
    stage.style.setProperty("--x", x + "px");
    stage.style.setProperty("--f", String(f));
    if (!ms) return 0;
    walker.dataset.dir = x >= from ? "1" : "-1";
    rider.classList.add("on-foot");
    walker.classList.remove("dig");
    setWalking(true, opts.trot ? 2.4 : WALK);
    ht(ms - 60, () => setWalking(false));
    return ms;
  }
  // Blue bits kicked up behind the front paws while digging.
  function kick() {
    const s = stage.getBoundingClientRect();
    const r = walker.getBoundingClientRect();
    const dir = Number(walker.dataset.dir);
    const px = (dir > 0 ? r.left + r.width * 0.62 : r.right - r.width * 0.62) - s.left;
    const py = r.top + r.height * 0.9 - s.top;
    for (let i = 0; i < 3; i++) {
      const b = document.createElement("i");
      b.className = "bit";
      b.style.background = ["#2563eb", "#60a5fa", "#93c5fd", "#4ade80"][Math.floor(Math.random() * 4)];
      stage.appendChild(b);
      const dx = -dir * (24 + Math.random() * 46);
      const up = 18 + Math.random() * 30;
      b.animate(
        [
          { transform: `translate(${px}px, ${py}px) rotate(0deg)`, opacity: 1 },
          { transform: `translate(${px + dx * 0.6}px, ${py - up}px) rotate(160deg)`, opacity: 1, offset: 0.45, easing: "cubic-bezier(0.4, 0, 1, 1)" },
          { transform: `translate(${px + dx}px, ${py + 6}px) rotate(300deg)`, opacity: 0 },
        ],
        { duration: 620 + Math.random() * 200, easing: "cubic-bezier(0, 0.4, 0.6, 1)" },
      ).onfinish = () => b.remove();
    }
  }
  const digStart = () => {
    walker.classList.add("dig");
    setWalking(true, WALK * 1.6);
    if (!reduced()) {
      clearInterval(digI);
      digI = window.setInterval(kick, 130);
      intervals.add(digI);
    }
  };
  const digStop = () => {
    walker.classList.remove("dig");
    setWalking(false);
    clearInterval(digI);
  };
  function confetti() {
    if (reduced()) return;
    const s = stage.getBoundingClientRect();
    const r = rider.getBoundingClientRect();
    const ox = r.left + r.width / 2 - s.left;
    const oy = r.top + r.height * 0.45 - s.top;
    const colors = ["#2563eb", "#60a5fa", "#4ade80", "#fbbf24", "#c4b5fd", "#0f172a"];
    for (let i = 0; i < 90; i++) {
      const c = document.createElement("i");
      c.className = "confetti";
      const w = 5 + Math.random() * 5;
      c.style.cssText = `width:${w}px;height:${Math.random() < 0.5 ? w * 0.45 : w}px;background:${colors[i % colors.length]};border-radius:${Math.random() < 0.3 ? "50%" : "1px"}`;
      stage.appendChild(c);
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
      const v = 150 + Math.random() * 230;
      const dx = Math.cos(a) * v;
      const dy = Math.sin(a) * v;
      const rot = (Math.random() - 0.5) * 1000;
      c.animate(
        [
          { transform: `translate(${ox}px, ${oy}px) rotate(0deg)`, opacity: 1 },
          { transform: `translate(${ox + dx}px, ${oy + dy}px) rotate(${rot / 2}deg)`, opacity: 1, offset: 0.38, easing: "cubic-bezier(0.35, 0, 0.9, 0.6)" },
          { transform: `translate(${ox + dx * 1.3}px, ${oy + dy + 300 + Math.random() * 160}px) rotate(${rot}deg)`, opacity: 0 },
        ],
        { duration: 2200 + Math.random() * 1000, easing: "cubic-bezier(0.1, 0.6, 0.4, 1)" },
      ).onfinish = () => c.remove();
    }
  }
  on("resize", () => walkTo(frac, { instant: true }));

  const clearPack = () => {
    pack.forEach((d) => d.remove());
    pack = [];
    q(cols[2], ".ep").forEach((e) => e.classList.remove("hit"));
  };
  const hit = (ep?: HTMLElement) => {
    if (!ep) return;
    ep.classList.remove("hit");
    void ep.offsetWidth;
    ep.classList.add("hit");
    later(() => ep.classList.remove("hit"), 900);
  };

  function heroReset() {
    heroTimers.forEach(cancel);
    heroTimers = [];
    digStop();
    stage.classList.remove("done", "running");
    stage.classList.add("armed");
    cols.forEach((c) => c.classList.remove("on"));
    q(stage, ".reveal").forEach((el) => el.classList.remove("in", "live"));
    q(stage, ".v2").forEach((el) => el.classList.remove("in", "live", "hl"));
    $("schema").classList.remove("grown");
    scope.classList.remove("hl");
    itext.textContent = "";
    intent.classList.remove("typing");
    status.textContent = "waiting for intent";
    thought.className = "thought";
    clearPack();
    walker.dataset.dir = "1";
    busy = true;
    tgt = null;
    dog.classList.remove("perk");
    walker.classList.remove("dig");
    setWalking(false);
    rider.classList.remove("on-foot");
    setMood(dog, "curious");
    dog.classList.add("dozing");
    walkTo(0, { instant: true });
  }

  // Face pack: front-facing dogs bound in along the track, each pinging an endpoint, then watch the lead.
  const FACES = [
    { m: "curious", k: 0.78 },
    { m: "active", k: 0.66 },
    { m: "relaxed", k: 0.9 },
  ];
  function facePackIn(done: () => void) {
    const rm = reduced();
    const eps = q(cols[2], ".ep");
    const s = stage.getBoundingClientRect();
    const c3 = cols[2].getBoundingClientRect();
    const hitX = c3.left - s.left + c3.width * 0.15;
    const leadX = (riderX ?? 0) + 12;
    const gap = Math.min(86, leadX / 3.4);
    let last = 0;
    FACES.forEach((cfg, i) => {
      const d = makeFace(cfg.m, cfg.k, "facepack");
      stage.appendChild(d);
      adopt(d);
      pack.push(d);
      d.follow = () => false;
      d.look = () => {
        const r = d.getBoundingClientRect();
        return { x: r.right + 300, y: r.top + r.height * 0.4 };
      };
      const w = d.offsetWidth;
      const from = -w;
      const to = Math.round(leadX - (i + 1) * gap);
      d.style.setProperty("--px", (rm ? to : from) + "px");
      if (rm) {
        hit(eps[i]);
        d.look = () => pt(dog);
        return;
      }
      const delay = i * 380;
      const ms = Math.round((to - from) * 1.9);
      const tHit = Math.max(0, Math.min(ms, (ms * (hitX - 0.5 * w - from)) / (to - from)));
      ht(delay, () => {
        d.style.setProperty("--dur", ms + "ms");
        d.style.setProperty("--px", to + "px");
        d.classList.add("bound");
      });
      ht(delay + tHit, () => hit(eps[i % eps.length]));
      ht(delay + ms, () => {
        d.classList.remove("bound");
        d.look = () => pt(dog);
        blink(d);
      });
      last = Math.max(last, delay + ms);
    });
    ht(rm ? 0 : 300, () => {
      tgt = pack[0];
    });
    ht(rm ? 0 : last + 200, done);
  }

  // The second change: a new ask lands and Apso adds it in the same pattern as the first build.
  // No walk and no confetti. The calm is the point: the next change looks like the last one.
  function secondChange() {
    const rm = reduced();
    const inv = [$("inv1"), $("inv2")];
    const ep = $("inv-ep");
    const proj = q(cols[2], ".ep")[0];
    status.textContent = "new request";
    tgt = caret;
    scope.classList.remove("hl");
    let t = 0;
    if (rm) itext.textContent = SECOND_INTENT;
    else {
      intent.classList.add("typing");
      for (let i = 0; i <= SECOND_INTENT.length; i++) ht(t + i * 55, () => (itext.textContent = SECOND_INTENT.slice(0, i)));
      t += SECOND_INTENT.length * 55 + 200;
      ht(t, () => intent.classList.remove("typing"));
    }
    ht(t, () => {
      cols[0].querySelector(".v2")!.classList.add("in");
      blink(dog);
    });
    t += rm ? 0 : 600;
    ht(t, () => {
      status.textContent = "writing schema";
      $("schema").classList.add("grown");
      inv.forEach((l) => l.classList.add("in"));
      tgt = inv[0];
    });
    ht(t + (rm ? 0 : 450), () => {
      scope.classList.add("hl");
      inv[1].classList.add("hl");
      blink(dog);
    });
    t += rm ? 0 : 1300;
    ht(t, () => {
      status.textContent = "generating";
      ep.classList.add("in", "live");
      tgt = ep;
      hit(proj);
      hit(ep);
      pack.forEach((d) => blink(d));
    });
    t += rm ? 0 : 900;
    ht(t, () => {
      status.textContent = "deployed";
      blink(dog, true);
      pulse(dog, "nod", 300);
      tgt = null;
      busy = false;
    });
  }

  // Deploy: break into a run, leap the finish, then the pack arrives and everyone celebrates.
  function deploy() {
    const rm = reduced();
    ht(rm ? 0 : walkTo(1, { trot: true }), () => {
      stage.classList.remove("running");
      stage.classList.add("done");
      status.textContent = "deployed";
      if (!rm)
        walker.animate(
          [
            { transform: "none" },
            { transform: "translateY(-30px)", offset: 0.45, easing: "cubic-bezier(0.3, 0, 0.7, 1)" },
            { transform: "translateY(0)", offset: 0.85 },
            { transform: "none" },
          ],
          { duration: 640, easing: "cubic-bezier(0.2, 0.7, 0.4, 1)" },
        );
      ht(rm ? 0 : 560, () => {
        rider.classList.remove("on-foot");
        tgt = null;
        setMood(dog, "happy");
        dog.classList.add("perk");
        pulse(dog, "hop", 560);
        blink(dog, true);
      });
      ht(rm ? 0 : 1000, () =>
        facePackIn(() => {
          tgt = null;
          [dog, ...pack].forEach((d, i) => {
            d.classList.add("perk");
            ht(i * 90, () => pulse(d, "hop", 560));
            ht(650 + i * 90, () => pulse(d, "hop", 560));
            pulse(d, "pant", 1470);
          });
          confetti();
          ht(1500, () => blink(dog, true));
          ht(3200, () => {
            setMood(dog, "relaxed");
            [dog, ...pack].forEach((d) => d.classList.remove("perk"));
          });
          ht(rm ? 3200 : 4400, secondChange);
        }),
      );
    });
  }
  // Inspect: walk over to the output and check each endpoint as it comes up.
  function inspect() {
    cols[2].classList.add("on");
    status.textContent = "generating";
    ht(walkTo(5 / 6) + 60, () => {
      q(cols[2], ".ep.reveal").forEach((el, i) => ht(100 + i * 360, () => {
        el.classList.add("in", "live");
        blink(walker);
      }));
      ht(100 + 3 * 360 + 300, deploy);
    });
  }
  // Work: off to the schema, and dig in.
  function work() {
    cols[1].classList.add("on");
    status.textContent = "writing schema";
    ht(walkTo(1 / 2) + 80, () => {
      digStart();
      q(cols[1], ".reveal").forEach((el, i) => ht(120 + i * 280, () => el.classList.add("in")));
      ht(120 + 5 * 280 + 200, () => {
        scope.classList.add("hl");
        digStop();
        blink(walker);
        ht(650, inspect);
      });
    });
  }
  function heroPlay() {
    heroReset();
    played = true;
    const rm = reduced();
    let t = 900;
    // Intent: wake up curious, an idea forms as the words arrive.
    ht(t, () => {
      stage.classList.add("running");
      status.textContent = "reading intent";
      cols[0].classList.add("on");
      twitch(dog, "l");
    });
    ht(t + 300, () => {
      dog.classList.remove("dozing");
      blink(dog);
      tgt = caret;
      thought.classList.add("on");
    });
    t += 500;
    const typeMs = rm ? 0 : 2200;
    if (rm) ht(t, () => (itext.textContent = FIRST_INTENT));
    else {
      ht(t, () => intent.classList.add("typing"));
      const step = typeMs / FIRST_INTENT.length;
      for (let i = 1; i <= FIRST_INTENT.length; i++) ht(t + i * step, () => (itext.textContent = FIRST_INTENT.slice(0, i)));
      ht(t + typeMs + 150, () => intent.classList.remove("typing"));
    }
    [0.2, 0.55, 0.85].forEach((k, i) => ht(t + typeMs * k, () => thought.classList.add("s" + (i + 1))));
    t += typeMs + 250;
    q(cols[0], ".reveal").forEach((el, i) => ht(t + i * 150, () => {
      el.classList.add("in");
      tgt = el;
    }));
    t += 700;
    // Got it: the idea pops, the dog gets up, eager to go.
    ht(t, () => {
      thought.classList.add("pop");
      blink(dog);
    });
    if (rm) {
      ht(t + 300, work);
      return;
    }
    ht(t + 300, () => {
      rider.classList.add("on-foot");
      walker.dataset.dir = "1";
    });
    ht(t + 1400, work);
  }
  if (reduced()) {
    // Final state is already rendered; place the resting lead dog at the end of the track.
    stage.classList.remove("armed");
    $("schema").classList.add("grown");
    itext.textContent = SECOND_INTENT;
    walkTo(1, { instant: true });
    setMood(dog, "relaxed");
    dog.classList.remove("dozing");
    facePackIn(() => {});
  } else onceInView(stage, heroPlay, 0.4);
  // Leave it alone and it dozes off; come back and it wakes up to look at you.
  let dozeT: number | undefined;
  observe(([e]) => {
    if (!played || busy) return;
    cancel(dozeT);
    if (!e.isIntersecting) dozeT = later(() => setMood(dog, "sleep"), 8000);
    else if (dog.mood === "sleep")
      dozeT = later(() => {
        twitch(dog, "l");
        later(() => {
          setMood(dog, "relaxed");
          blink(dog, true);
        }, 320);
      }, 500);
  }).observe(stage);

  /* ---------- Frontend stack: the query chain builds, then the request travels ---------- */
  const sdk = $("sdk");
  if (!reduced())
    onceInView(sdk, () => {
      sdk.classList.add("armed");
      q(sdk, ".chain").forEach((el, i) => later(() => el.classList.add("in"), 300 + i * 260));
      later(() => sdk.classList.add("go"), 300 + 4 * 260 + 200);
    }, 0.5);

  /* ---------- How it works: each step plays its own scene when the scroll reaches it ---------- */
  const stepsEl = $("steps");
  const steps = q<StepEl>(stepsEl, ".step");
  if (!reduced()) {
    stepsEl.classList.add("scrolly");
    const stepTimer = (s: StepEl) => (ms: number, fn: () => void) => s.tm!.push(later(fn, ms));
    const scenes: Record<string, (d: DogEl, sc: HTMLElement, at2: (ms: number, fn: () => void) => void) => void> = {
      curious(d, sc, at2) {
        sc.classList.add("on");
        q(sc, ".rule").forEach((_, i) => at2(160 + i * 160, () => twitch(d, i % 2 ? "r" : "l")));
        at2(1250, () => {
          d.classList.add("perk");
          blink(d);
        });
      },
      active(d, sc, at2) {
        sc.classList.add("on");
        q(sc, ".ent").forEach((_, i) => at2(560 + i * 260, () => pulse(d, "nod", 300)));
      },
      happy(d, sc, at2) {
        const tx = sc.querySelector<HTMLElement>(".ask-t")!;
        const full = tx.dataset.full!;
        const items = q(sc, "li");
        sc.classList.add("on");
        for (let i = 1; i <= full.length; i++) at2(250 + i * 38, () => (tx.textContent = full.slice(0, i)));
        const t0 = 250 + full.length * 38 + 300;
        items.forEach((li, i) => at2(t0 + i * 380, () => {
          li.classList.add("t");
          blink(d);
        }));
        at2(t0 + items.length * 380 + 100, () => {
          pulse(d, "hop", 560);
          pulse(d, "pant", 1470);
        });
      },
    };
    const resetScene = (s: StepEl) => {
      (s.tm || []).forEach(cancel);
      s.tm = [];
      const sc = s.querySelector<HTMLElement>(".scene")!;
      const tx = sc.querySelector<HTMLElement>(".ask-t");
      sc.classList.remove("on");
      s.querySelector(".dog")!.classList.remove("perk");
      q(sc, "li").forEach((li) => li.classList.remove("t"));
      if (tx) tx.textContent = "";
    };
    let ticking = false;
    const stepsUpdate = () => {
      ticking = false;
      const r = stepsEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.35;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height * 0.5)));
      steps.forEach((s, i) => {
        const sp = Math.min(1, Math.max(0, p * 3 - i));
        const d = s.querySelector<DogEl>(".dog")!;
        s.querySelector<HTMLElement>(".rail i")!.style.setProperty("--p", sp.toFixed(3));
        const isOn = sp > 0.02;
        if (isOn !== s.classList.contains("awake")) {
          s.classList.toggle("awake", isOn);
          setMood(d, isOn ? s.dataset.wake! : "sleep");
          if (isOn) {
            twitch(d, "l");
            blink(d);
            resetScene(s);
            scenes[s.dataset.wake!](d, s.querySelector<HTMLElement>(".scene")!, stepTimer(s));
          } else resetScene(s);
        }
      });
    };
    steps.forEach((s) => {
      const d = s.querySelector<DogEl>(".dog")!;
      const sc = s.querySelector<HTMLElement>(".scene")!;
      s.classList.remove("awake");
      setMood(d, "sleep");
      resetScene(s);
      d.look = () => pt(sc);
      d.follow = () => false;
    });
    on("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(stepsUpdate);
      }
    }, { passive: true });
    on("resize", stepsUpdate);
    stepsUpdate();
  }

  /* ---------- Deploy band: a pack of face dogs that grows, each fidgeting on its own ---------- */
  const band = $("band");
  const yard = $("yard");
  const startBtn = $("start");
  const yardDogs: DogEl[] = [];
  let yardOn = false;
  let attn = false;
  let joinI = 0;
  let slots: number[] = [];
  const yardMax = () => (yard.clientWidth < 600 ? 5 : 9);
  const MOODS = ["curious", "active", "happy", "relaxed", "sleep", "active", "curious", "relaxed", "happy"];
  function fidget(d: DogEl) {
    cancel(d.next);
    if (yardOn && !attn && !reduced() && d.mood !== "sleep") {
      const r = Math.random();
      const others = yardDogs.filter((o) => o !== d);
      if (r < 0.22) pulse(d, "hop", 560);
      else if (r < 0.45) {
        const W = yard.clientWidth;
        d.x = Math.max(0, Math.min(W - d.offsetWidth, (d.x ?? 0) + (Math.random() < 0.5 ? -1 : 1) * (12 + Math.random() * 26)));
        d.style.setProperty("--px", d.x + "px");
        pulse(d, "hop", 560);
      } else if (r < 0.72 && others.length) {
        d.lookAt = others[Math.floor(Math.random() * others.length)];
        later(() => (d.lookAt = null), 2200);
      } else if (r < 0.86) {
        d.classList.add("perk");
        later(() => d.classList.remove("perk"), 1200);
      } else {
        d.style.setProperty("--tilt", "-12deg");
        later(() => d.style.removeProperty("--tilt"), 1300);
      }
    }
    d.next = later(() => fidget(d), 1400 + Math.random() * 2800);
  }
  function addFaceDog(i: number) {
    const N = yardMax();
    const W = yard.clientWidth;
    const d = makeFace(MOODS[i % MOODS.length], (0.62 + Math.random() * 0.4).toFixed(2), "yardface");
    yard.appendChild(d);
    adopt(d);
    yardDogs.push(d);
    d.follow = () => attn;
    d.look = () => (attn ? pt(startBtn) : d.lookAt ? pt(d.lookAt) : null);
    d.x = Math.round(((slots[i] + 0.5) * W) / N - d.offsetWidth / 2 + (Math.random() - 0.5) * 24);
    d.x = Math.max(0, Math.min(W - d.offsetWidth, d.x));
    d.style.setProperty("--px", d.x + "px");
    if (!reduced()) {
      d.style.setProperty("--py", "110%");
      void d.offsetWidth;
      d.style.setProperty("--py", "0px");
      blink(d);
    }
    d.next = later(() => fidget(d), 900 + Math.random() * 1500);
  }
  function bandEnter() {
    slots = Array.from({ length: yardMax() }, (_, i) => i).sort(() => Math.random() - 0.5);
    if (reduced()) {
      for (let i = 0; i < yardMax(); i++) addFaceDog(i);
      return;
    }
    addFaceDog(0);
    joinI = window.setInterval(() => {
      if (!alive) return;
      if (yardDogs.length >= yardMax()) {
        clearInterval(joinI);
        // Once the pack is full, the sleeper wakes up happy.
        const sleeper = yardDogs.find((d) => d.mood === "sleep");
        if (sleeper)
          later(() => {
            twitch(sleeper, "l");
            setMood(sleeper, "happy");
            blink(sleeper, true);
            pulse(sleeper, "hop", 560);
          }, 1200);
        return;
      }
      addFaceDog(yardDogs.length);
    }, 1100);
    intervals.add(joinI);
  }
  onceInView(band, () => {
    yardOn = true;
    bandEnter();
  }, 0.3);
  observe(([e]) => {
    yardOn = e.isIntersecting;
  }).observe(band);
  // Attention: aim for Start building and the whole pack looks at it.
  const look = () => {
    if (attn || reduced()) return;
    attn = true;
    yardDogs.forEach((d, i) => {
      cancel(d.next);
      d.lookAt = null;
      d.classList.add("perk");
      if (i % 3 === 0) later(() => pulse(d, "hop", 560), 120 + i * 60);
    });
  };
  const release = () => {
    attn = false;
    yardDogs.forEach((d) => {
      d.classList.remove("perk");
      d.next = later(() => fidget(d), 300 + Math.random() * 900);
    });
  };
  for (const [type, fn] of [["mouseenter", look], ["focus", look], ["mouseleave", release], ["blur", release]] as const) {
    startBtn.addEventListener(type, fn);
    unlisten.push(() => startBtn.removeEventListener(type, fn));
  }

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    timers.forEach((id) => clearTimeout(id));
    intervals.forEach((id) => clearInterval(id));
    observers.forEach((io) => io.disconnect());
    unlisten.forEach((fn) => fn());
    anim.destroy();
    pack.forEach((d) => d.remove());
    yardDogs.forEach((d) => d.remove());
  };
}
