var binpacking = require('binpacking');


var packingService = {};

packingService.packing = function packing(blocks){
    var Packer = binpacking.Packer;
    var GrowingPacker = binpacking.GrowingPacker;
    // var blocks = [{w:100, h:100}, {w:100, h:100}, {w:100, h:200}];
    var packer = new GrowingPacker;
    console.log(blocks);
    packer.fit(blocks);
    return {packer:packer,blocks:blocks}
}



module.exports = packingService;