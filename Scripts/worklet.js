class WorkletProcessor extends AudioWorkletProcessor {
    process(inputs, outputs, parameters) {
      outputs.forEach((output) => {
        output.forEach((channel) => {
          for (let i = 0; i < channel.length; i++) {
            channel[i] = 0;
          }
        });
      });
  
      return true;
    }
  }
  
  registerProcessor('worklet-processor', WorkletProcessor);
  