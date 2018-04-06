// generate layers array
const getlyrs = (sel, count) => {
  const lyrs = [];

  for (let i = 0; i <= count - 1; i += 1) {
    const lyr = sel.objectAtIndex(i);
    const frame = lyr.frame();

    lyrs.push({
      pointer: lyr,
      name: lyr.name(),
      w: frame.width(),
      h: frame.height(),
      x: frame.x(),
      y: frame.y(),
      dist: {
        x: 0,
        y: 0
      }
    });
  }

  return lyrs;
}

// reorder array by position rather than depth
const reorder = (lyrs, axe) => [...lyrs].sort((a, b) => (a[axe] - b[axe]));

// store distance between bottom/right edge of a layer and its subsequent one
const getdist = lyrs => {
  lyrs.forEach((lyr, idx) => {
    const next = lyrs[idx + 1];
    lyr.dist.y = next ? (next.y - lyr.y - lyr.h) : 0;
    lyr.dist.x = next ? (next.x - lyr.x - lyr.w) : 0;
  });

  return lyrs;
}

// reposition the layers on the artboard
const reposition = (lyrs, axe) => {
  lyrs.reverse().forEach((lyr, idx) => {
    const prev = lyrs[idx - 1];
    const lastPos = lyrs[lyrs.length - 1][axe];
    const dim = axe === 'y' ? 'h' : 'w';
    const prevBounds = prev ? prev.pointer.frame()[axe]() + prev[dim] : lastPos;

    lyr.pointer.frame()[axe] = prevBounds + lyr.dist[axe];
  });
}

// get parent layer
const getParent = sel => sel && sel.firstObject().parentGroup();

// reverse layers depth
const redepth = (sel, lyrs, parent) => {
  const ph = MSLayer.alloc().init();

  parent.insertLayers_beforeLayer([ph], sel.firstObject());
  lyrs.reverse().forEach(lyr => {
    lyr.pointer.moveToLayer_beforeLayer(lyr.pointer.parentGroup(), ph);
  });
  ph.removeFromParent();
}

// exit and print message
const exit = (doc, msg) => {
  doc.showMessage(msg);
  doc.reloadInspector();
};

// reverse the layer order on a specific axe, or just their depth
const reverse = (ctx, axe) => {
  const doc = ctx.document;
  const sel = ctx.selection;
  const count = sel.count();
  const err = 'Select two (or more) layers! 🙏';
  const lyrs = getlyrs(sel, count);

  if (count <= 1) {
    doc.showMessage(err);
    return;
  }

  if (axe === 'dpt') {
    redepth(sel, lyrs, getParent(sel));
    exit(doc, `Reversed order of ${count} layers. 🎉`);
  } else {
    reposition(getdist(reorder(lyrs, axe)), axe);
    exit(doc, `Reversed position of ${count} layers on the ${axe.toUpperCase()} axe. 🎉`);
  }
}

export default reverse;
